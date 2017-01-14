/**
 *
 * @authors yusen
 * @date    2016-01-08 11:17:59
 * https://github.com/yscoder/Calendar
 * download by www.sucaijiayuan.com
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('calendar', ['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
}(this, function($) {

    // default config

    var defaults = {

            // 宽度
            width: 280,
            // 高度, 不包含头部，头部固定高度
            height: 280,

            zIndex: 1,

            // selector or element
            // 设置触发显示的元素，为null时默认显示
            trigger: null,

            // 偏移位置，可设正负值
            // trigger 设置时生效
            offset: [0, 1],

            // 自定义类，用于重写样式
            customClass: '',

            // 显示视图
            // 可选：date, month
            view: 'date',

            // 默认日期为当前日期
            date: new Date(),
            format: 'yyyy/mm/dd',

            // 一周的第一天
            // 0表示周日，依次类推
            startWeek: 0,

            // 星期格式
            weekArray: ['日', '一', '二', '三', '四', '五', '六'],

            // 设置选择范围
            // 格式：[开始日期, 结束日期]
            // 开始日期为空，则无上限；结束日期为空，则无下限
            // 如设置2015年11月23日以前不可选：[new Date(), null] or ['2015/11/23']
            selectedRang: null,

            // 日期关联数据 [{ date: string, value: object }, ... ]
            // 日期格式与 format 一致
            // 如 [ {date: '2015/11/23', value: '面试'} ]
            data: null,

            // 展示关联数据
            // 格式化参数：{m}视图，{d}日期，{v}value
            // 设置 false 表示不显示
            label: '{d}\n{v}',

            // 切换字符
            prev: '&lt;',
            next: '&gt;',

            // 切换视图
            // 参数：view, y, m
            viewChange: $.noop,

            // view: 视图
            // date: 不同视图返回不同的值
            // value: 日期关联数据
            onSelected: function(view, date, value) {
                // body...
            },

            // 参数同上
            onMouseenter: $.noop,

            onClose: $.noop
        },

        // static variable

        ACTION_NAMESPACE = 'data-calendar-',

        DISPLAY_VD = '[' + ACTION_NAMESPACE + 'display-date]',
        DISPLAY_VM = '[' + ACTION_NAMESPACE + 'display-month]',

        ARROW_DATE = '[' + ACTION_NAMESPACE + 'arrow-date]',
        ARROW_MONTH = '[' + ACTION_NAMESPACE + 'arrow-month]',

        ITEM_DAY = ACTION_NAMESPACE + 'day',
        ITEM_MONTH = ACTION_NAMESPACE + 'month',

        DISABLED = 'disabled',
        MARK_DATA = 'markData',

        VIEW_CLASS = {
            date: 'calendar-d',
            month: 'calendar-m'
        },

        OLD_DAY_CLASS = 'old',
        NEW_DAY_CLASS = 'new',
        TODAY_CLASS = 'now',
        SELECT_CLASS = 'selected',
        MARK_DAY_HTML = '<i class="dot"></i>',
        DATE_DIS_TPL = '{year}/<span class="m">{month}</span>',

        ITEM_STYLE = 'style="width:{w}px;height:{h}px;line-height:{h}px"',
        WEEK_ITEM_TPL = '<li ' + ITEM_STYLE + '>{wk}</li>',
        DAY_ITEM_TPL = '<li ' + ITEM_STYLE + ' class="{class}" {action}>{value}</li>',
        MONTH_ITEM_TPL = '<li ' + ITEM_STYLE + ' ' + ITEM_MONTH + '>{m}月</li>',

        TEMPLATE = [
            '<div class="calendar-inner">',
            '<div class="calendar-views">',
            '<div class="view view-date">',
            '<div class="calendar-hd">',
            '<a href="javascript:;" data-calendar-display-date class="calendar-display">',
            '{yyyy}/<span class="m">{mm}</span>',
            '</a>',
            '<div class="calendar-arrow">',
            '<span class="prev" title="上一月" data-calendar-arrow-date>{prev}</span>',
            '<span class="next" title="下一月" data-calendar-arrow-date>{next}</span>',
            '</div>',
            '</div>',
            '<div class="calendar-ct">',
            '<ol class="week">{week}</ol>',
            '<ul class="date-items"></ul>',
            '</div>',
            '</div>',
            '<div class="view view-month">',
            '<div class="calendar-hd">',
            '<a href="javascript:;" data-calendar-display-month class="calendar-display">{yyyy}</a>',
            '<div class="calendar-arrow">',
            '<span class="prev" title="上一年" data-calendar-arrow-month>{prev}</span>',
            '<span class="next" title="下一年" data-calendar-arrow-month>{next}</span>',
            '</div>',
            '</div>',
            '<ol class="calendar-ct month-items">{month}</ol>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="calendar-label"><p>HelloWorld</p><i></i></div>'
        ],
        OS = Object.prototype.toString;

    // utils

    function isDate(obj) {
        return OS.call(obj) === '[object Date]';
    }

    function isString(obj) {
        return OS.call(obj) === '[object String]';
    }


    function getClass(el) {
        return el.getAttribute('class') || el.getAttribute('className');
    }

    // extension methods

    String.prototype.repeat = function(data) {
        return this.replace(/\{\w+\}/g, function(str) {
            var prop = str.replace(/\{|\}/g, '');
            return data[prop] || '';
        });
    }

    String.prototype.toDate = function() {
        var dt = new Date(),
            dot = this.replace(/\d/g, '').charAt(0),
            arr = this.split(dot);

        dt.setFullYear(arr[0]);
        dt.setMonth(arr[1] - 1);
        dt.setDate(arr[2]);
        return dt;
    }

    Date.prototype.format = function(exp) {
        var y = this.getFullYear(),
            m = this.getMonth() + 1,
            d = this.getDate();

        return exp.replace('yyyy', y).replace('mm', m).replace('dd', d);
    }

    Date.prototype.isSame = function(y, m, d) {
        if (isDate(y)) {
            var dt = y;
            y = dt.getFullYear();
            m = dt.getMonth() + 1;
            d = dt.getDate();
        }
        return this.getFullYear() === y && this.getMonth() + 1 === m && this.getDate() === d;
    }

    Date.prototype.add = function(n) {
        this.setDate(this.getDate() + n);
    }

    Date.prototype.minus = function(n) {
        this.setDate(this.getDate() - n);
    }

    Date.prototype.clearTime = function(n) {
        this.setHours(0);
        this.setSeconds(0);
        this.setMinutes(0);
        this.setMilliseconds(0);
        return this;
    }

    Date.isLeap = function(y) {
        return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
    }

    Date.getDaysNum = function(y, m) {
        var num = 31;

        switch (m) {
            case 2:
                num = this.isLeap(y) ? 29 : 28;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                num = 30;
                break;
        }
        return num;
    }

    Date.getSiblingsMonth = function(y, m, n) {
        var d = new Date(y, m - 1);
        d.setMonth(m - 1 + n);
        return {
            y: d.getFullYear(),
            m: d.getMonth() + 1
        };
    }

    Date.getPrevMonth = function(y, m, n) {
        return this.getSiblingsMonth(y, m, 0 - (n || 1));
    }

    Date.getNextMonth = function(y, m, n) {
        return this.getSiblingsMonth(y, m, n || 1);
    }

    Date.tryParse = function(obj) {
        if (!obj) {
            return obj;
        }
        return isDate(obj) ? obj : obj.toDate();
    }


    // Calendar class

    function Calendar(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.calendar.defaults, options);
        this.$element.addClass('calendar ' + this.options.customClass);
        this.width = this.options.width;
        this.height = this.options.height;
        this.date = this.options.date;
        this.selectedRang = this.options.selectedRang;
        this.data = this.options.data;
        this.init();
    }

    Calendar.prototype = {
        constructor: Calendar,
        getDayAction: function(day) {
            var action = ITEM_DAY;
            if (this.selectedRang) {
                var start = Date.tryParse(this.selectedRang[0]),
                    end = Date.tryParse(this.selectedRang[1]);

                if ((start && day < start.clearTime()) || (end && day > end.clearTime())) {
                    action = DISABLED;
                }
            }

            return action;
        },
        getDayData: function(day) {
            var ret, data = this.data;

            if (data) {

                for (var i = 0, len = data.length; i < len; i++) {
                    var item = data[i];

                    if (day.isSame(item.date.toDate())) {
                        ret = item.value;
                    }
                }
            }

            return ret;
        },
        getDayItem: function(y, m, d, f) {
            var dt = this.date,
                idt = new Date(y, m - 1, d),
                data = {
                    w: this.width / 7,
                    h: this.height / 7,
                    value: d
                },
                markData,
                $item;

            var selected = dt.isSame(y, m, d) ? SELECT_CLASS : '';
            if (f === 1) {
                data['class'] = OLD_DAY_CLASS;
            } else if (f === 3) {
                data['class'] = NEW_DAY_CLASS;
            } else {
                data['class'] = '';
            }

            if (dt.isSame(y, m, d)) {
                data['class'] += ' ' + TODAY_CLASS;
            }

            data.action = this.getDayAction(idt);
            markData = this.getDayData(idt);

            $item = $(DAY_ITEM_TPL.repeat(data));

            if (markData) {
                $item.data(MARK_DATA, markData);
                $item.html(d + MARK_DAY_HTML);
            }

            return $item;
        },
        getDaysHtml: function(y, m) {
            var year, month, firstWeek, daysNum, prevM, prevDiff,
                dt = this.date,
                $days = $('<ol class="days"></ol>');

            if (isDate(y)) {
                year = y.getFullYear();
                month = y.getMonth() + 1;
            } else {
                year = Number(y);
                month = Number(m);
            }

            firstWeek = new Date(year, month - 1, 1).getDay() || 7;
            prevDiff = firstWeek - this.options.startWeek;
            daysNum = Date.getDaysNum(year, month);
            prevM = Date.getPrevMonth(year, month);
            prevDaysNum = Date.getDaysNum(year, prevM.m);
            nextM = Date.getNextMonth(year, month);
            // month flag
            var PREV_FLAG = 1,
                CURR_FLAG = 2,
                NEXT_FLAG = 3,
                count = 0;

            for (var p = prevDaysNum - prevDiff + 1; p <= prevDaysNum; p++, count++) {

                $days.append(this.getDayItem(prevM.y, prevM.m, p, PREV_FLAG));
            }

            for (var c = 1; c <= daysNum; c++, count++) {
                $days.append(this.getDayItem(year, month, c, CURR_FLAG));
            }

            for (var n = 1, nl = 42 - count; n <= nl; n++) {

                $days.append(this.getDayItem(nextM.y, nextM.m, n, NEXT_FLAG));
            }

            return $('<li></li>').width(this.options.width).append($days);
        },
        getWeekHtml: function() {
            var week = [],
                weekArray = this.options.weekArray,
                start = this.options.startWeek,
                len = weekArray.length,
                w = this.width / 7,
                h = this.height / 7;

            for (var i = start; i < len; i++) {
                week.push(WEEK_ITEM_TPL.repeat({
                    w: w,
                    h: h,
                    wk: weekArray[i]
                }));
            }

            for (var j = 0; j < start; j++) {
                week.push(WEEK_ITEM_TPL.repeat({
                    w: w,
                    h: h,
                    wk: weekArray[j]
                }));
            }

            return week.join('');
        },
        getMonthHtml: function() {
            var month = [],
                w = this.width / 4,
                h = this.height / 4,
                i = 1;

            for (; i < 13; i++) {
                month.push(MONTH_ITEM_TPL.repeat({
                    w: w,
                    h: h,
                    m: i
                }));
            }

            return month.join('');
        },
        setMonthAction: function(y) {
            var m = this.date.getMonth() + 1;

            this.$monthItems.children().removeClass(TODAY_CLASS);
            if (y === this.date.getFullYear()) {
                this.$monthItems.children().eq(m - 1).addClass(TODAY_CLASS);
            }
        },
        fillStatic: function() {
            var staticData = {
                prev: this.options.prev,
                next: this.options.next,
                week: this.getWeekHtml(),
                month: this.getMonthHtml()
            };

            this.$element.html(TEMPLATE.join('').repeat(staticData));
        },
        updateDisDate: function(y, m) {
            this.$disDate.html(DATE_DIS_TPL.repeat({
                year: y,
                month: m
            }));
        },
        updateDisMonth: function(y) {
            this.$disMonth.html(y);
        },
        fillDateItems: function(y, m) {
            var ma = [
                Date.getPrevMonth(y, m), {
                    y: y,
                    m: m
                },
                Date.getNextMonth(y, m)
            ];

            this.$dateItems.html('');
            for (var i = 0; i < 3; i++) {
                var $item = this.getDaysHtml(ma[i].y, ma[i].m);
                this.$dateItems.append($item);
            }

        },
        hide: function(view, date, data) {
            this.$trigger.val(date.format(this.options.format));
            this.options.onClose.call(this, view, date, data);
            this.$element.hide();
        },
        trigger: function() {

            this.$trigger = this.options.trigger instanceof $ ? this.options.trigger : $(this.options.trigger);

            var _this = this,
                $this = _this.$element,
                post = _this.$trigger.offset(),
                offs = _this.options.offset;

            $this.addClass('calendar-modal').css({
                left: (post.left + offs[0]) + 'px',
                top: (post.top + _this.$trigger.outerHeight() + offs[1]) + 'px',
                zIndex: _this.options.zIndex
            });

            _this.$trigger.click(function() {
                $this.show();
            });

            $(document).click(function(e) {
                if (_this.$trigger[0] != e.target && !$.contains($this[0], e.target)) {
                    $this.hide();
                }
            });
        },
        render: function() {
            this.$week = this.$element.find('.week');
            this.$dateItems = this.$element.find('.date-items');
            this.$monthItems = this.$element.find('.month-items');
            this.$label = this.$element.find('.calendar-label');
            this.$disDate = this.$element.find(DISPLAY_VD);
            this.$disMonth = this.$element.find(DISPLAY_VM);

            var y = this.date.getFullYear(),
                m = this.date.getMonth() + 1;

            this.updateDisDate(y, m);
            this.updateMonthView(y);

            this.fillDateItems(y, m);

            this.options.trigger && this.trigger();

        },
        setView: function(view) {
            this.$element.removeClass(VIEW_CLASS.date + ' ' + VIEW_CLASS.month)
                .addClass(VIEW_CLASS[view]);
            this.view = view;
        },
        updateDateView: function(y, m, dirc, cb) {
            m = m || this.date.getMonth() + 1;

            var _this = this,
                $dis = this.$dateItems,
                exec = {
                    prev: function() {
                        var pm = Date.getPrevMonth(y, m),
                            ppm = Date.getPrevMonth(y, m, 2),
                            $prevItem = _this.getDaysHtml(ppm.y, ppm.m);

                        m = pm.m;
                        y = pm.y;

                        $dis.animate({
                            marginLeft: 0
                        }, 300, 'swing', function() {
                            $dis.children(':last').remove();
                            $dis.prepend($prevItem).css('margin-left', '-100%');

                            $.isFunction(cb) && cb.call(_this);
                        });
                    },
                    next: function() {
                        var nm = Date.getNextMonth(y, m),
                            nnm = Date.getNextMonth(y, m, 2),
                            $nextItem = _this.getDaysHtml(nnm.y, nnm.m);

                        m = nm.m;
                        y = nm.y;

                        $dis.animate({
                            marginLeft: '-200%'
                        }, 300, 'swing', function() {
                            $dis.children(':first').remove();
                            $dis.append($nextItem).css('margin-left', '-100%');

                            $.isFunction(cb) && cb.call(_this);
                        });

                    }
                };


            if (dirc) {
                exec[dirc]();
            } else {
                this.fillDateItems(y, m);
            }

            this.updateDisDate(y, m);

            this.setView('date');

            return {
                y: y,
                m: m
            };
        },
        updateMonthView: function(y) {
            this.updateDisMonth(y);
            this.setMonthAction(y);
            this.setView('month');
        },
        getDisDateValue: function() {
            var arr = this.$disDate.html().split('/'),
                y = Number(arr[0]),
                m = Number(arr[1].match(/\d{1,2}/)[0]);

            return [y, m];
        },
        selectedDay: function(d, type) {
            var arr = this.getDisDateValue(),
                y = arr[0],
                m = arr[1],
                toggleClass = function() {
                    this.$dateItems.children(':eq(1)')
                        .find('[' + ITEM_DAY + ']:not(.' + NEW_DAY_CLASS + ', .' + OLD_DAY_CLASS + ')')
                        .removeClass(SELECT_CLASS)
                        .filter(function(index) {
                            return parseInt(this.innerHTML) === d;
                        }).addClass(SELECT_CLASS);
                };

            if (type) {
                var ret = this.updateDateView(y, m, {
                    'old': 'prev',
                    'new': 'next'
                }[type], toggleClass);
                y = ret.y;
                m = ret.m;
                this.options.viewChange('date', y, m);
            } else {
                toggleClass.call(this);
            }

            return new Date(y, m - 1, d);
        },
        showLabel: function(event, view, date, data) {
            var $lbl = this.$label;

            $lbl.find('p').html(this.options.label.repeat({
                m: view,
                d: date.format(this.options.format),
                v: data
            }).replace(/\n/g, '<br>'));

            var w = $lbl.outerWidth(),
                h = $lbl.outerHeight();

            $lbl.css({
                left: (event.pageX - w / 2) + 'px',
                top: (event.pageY - h - 20) + 'px'
            }).show();
        },
        hasLabel: function() {
            if (this.options.label) {
                $('body').append(this.$label);
                return true;
            }
            return false;
        },
        event: function() {
            var _this = this,
                vc = _this.options.viewChange;

            // view change
            _this.$element.on('click', DISPLAY_VD, function() {
                var arr = _this.getDisDateValue();
                _this.updateMonthView(arr[0], arr[1]);

                vc('month', arr[0], arr[1]);

            }).on('click', DISPLAY_VM, function() {
                var y = this.innerHTML;

                _this.updateDateView(y);
                vc('date', y);
            });

            // arrow
            _this.$element.on('click', ARROW_DATE, function() {
                var arr = _this.getDisDateValue(),
                    type = getClass(this),
                    y = arr[0],
                    m = arr[1];

                var d = _this.updateDateView(y, m, type, function() {
                    vc('date', d.y, d.m);
                });

            }).on('click', ARROW_MONTH, function() {

                var y = Number(_this.$disMonth.html()),
                    type = getClass(this);

                y = type === 'prev' ? y - 1 : y + 1;
                _this.updateMonthView(y);
                vc('month', y);
            });

            // selected
            _this.$element.on('click', '[' + ITEM_DAY + ']', function() {
                var d = parseInt(this.innerHTML),
                    cls = getClass(this),
                    type = /new|old/.test(cls) ? cls.match(/new|old/)[0] : '';

                var day = _this.selectedDay(d, type);

                _this.options.onSelected.call(this, 'date', day, $(this).data(MARK_DATA));

                _this.$trigger && _this.hide('date', day, $(this).data(MARK_DATA));

            }).on('click', '[' + ITEM_MONTH + ']', function() {
                var y = Number(_this.$disMonth.html()),
                    m = parseInt(this.innerHTML);

                _this.updateDateView(y, m);
                vc('date', y, m);
                _this.options.onSelected.call(this, 'month', new Date(y, m - 1));
            });

            // hover
            _this.$element.on('mouseenter', '[' + ITEM_DAY + ']', function(e) {
                var arr = _this.getDisDateValue(),
                    day = new Date(arr[0], arr[1] - 1, parseInt(this.innerHTML));

                if (_this.hasLabel && $(this).data(MARK_DATA)) {
                    $('body').append(_this.$label);
                    _this.showLabel(e, 'date', day, $(this).data(MARK_DATA));
                }

                _this.options.onMouseenter.call(this, 'date', day, $(this).data(MARK_DATA));
            }).on('mouseleave', '[' + ITEM_DAY + ']', function() {
                _this.$label.hide();
            });
        },
        resize: function() {
            var w = this.width,
                h = this.height,
                hdH = this.$element.find('.calendar-hd').outerHeight();

            this.$element.width(w).height(h + hdH)
                .find('.calendar-inner, .view')
                .css('width', w + 'px');

            this.$element.find('.calendar-ct').width(w).height(h);

        },
        init: function() {

            this.fillStatic();
            this.resize();
            this.render();
            this.view = this.options.view;
            this.setView(this.view);
            this.event();
        },
        setData: function(data) {
            this.data = data;

            if (this.view === 'date') {
                var d = this.getDisDateValue();
                this.fillDateItems(d[0], d[1]);
            } else if (this.view === 'month') {
                this.updateMonthView(this.$disMonth.html());
            }
        },
        methods: function(name, args) {
            if (OS.call(this[name]) === '[object Function]') {
                return this[name].apply(this, args);
            }
        }
    };

    $.fn.calendar = function(options) {
        var calendar = this.data('calendar'),
            fn,
            args = [].slice.call(arguments);

        if (!calendar) {
            return this.each(function() {
                return $(this).data('calendar', new Calendar(this, options));
            });
        }
        if (isString(options)) {
            fn = options;
            args.shift();
            return calendar.methods(fn, args);
        }

        return this;
    }

    $.fn.calendar.defaults = defaults;

}));

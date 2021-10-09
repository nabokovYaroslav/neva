/**
 * Full page
 */
(function () {
  "use strict";

  /**
   * Full scroll main function
   */
  var fullScroll = function (params) {
    this.params = params;
    /**
     * Main div
     * @type {Object}
     */
    var main = document.getElementById(params.mainElement);

    /**
     * Sections divclass
     * @type {Array}
     */
    var sections = main.children;

    /**
     * Full page scroll configurations
     * @type {Object}
     */
    var defaults = {
      container: main,
      sections: sections,
      animateTime: params.animateTime || 0.7,
      animateFunction: params.animateFunction || "ease",
      maxPosition: sections.length - 1,
      currentPosition: 0,
      displayDots:
        typeof params.displayDots != "undefined" ? params.displayDots : true,
      dotsPosition: params.dotsPosition || "left",
      menuElement:
        typeof params.menuElement != "undefined"
          ? document.querySelector(params.menuElement)
          : false,
    };

    this.defaults = defaults;
    /**
     * Init build
     */
    this.init();
  };

  /**
   * Init plugin
   */
  fullScroll.prototype.init = function () {
    this.buildPublicFunctions().buildSections().buildDots().addEvents();

    var anchor = location.hash.replace("#", "").split("/")[0];
    /* location.hash = 0; // don't use for named hashes */
    this.changeCurrentPosition(anchor);
    this.registerIeTags();
  };

  /**
   * Build sections
   * @return {Object} this(fullScroll)
   */
  fullScroll.prototype.buildSections = function () {
    var sections = this.defaults.sections;
    for (var i = 0; i < sections.length; i++) {
      sections[i].setAttribute("data-index", i);
    }
    return this;
  };

  /**
   * Build dots navigation
   * @return {Object} this (fullScroll)
   */
  fullScroll.prototype.buildDots = function () {
    this.ul = document.createElement("ul");

    this.ul.className = this.updateClass(1, "dots", this.ul.className);
    this.ul.className = this.updateClass(
      1,
      this.defaults.dotsPosition == "right" ? "dots-right" : "dots-left",
      this.ul.className
    );

    var _self = this;
    var sections = this.defaults.sections;

    for (var i = 0; i < sections.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");

      a.setAttribute("href", "#" + i);
      li.appendChild(a);
      _self.ul.appendChild(li);
    }

    this.ul.childNodes[0].firstChild.className = this.updateClass(
      1,
      "active",
      this.ul.childNodes[0].firstChild.className
    );

    if (this.defaults.menuElement) {
      this.defaults.menuElement.childNodes[0].className = this.updateClass(
        1,
        "active",
        this.defaults.menuElement.childNodes[0].className
      );
    }

    if (this.defaults.displayDots) {
      document.body.appendChild(this.ul);
    }

    return this;
  };

  /**
   * Add Events
   * @return {Object} this(fullScroll)
   */
  fullScroll.prototype.addEvents = function () {
    if (document.addEventListener) {
      document.addEventListener("mousewheel", this.mouseWheelAndKey, false);
      document.addEventListener("wheel", this.mouseWheelAndKey, false);
      document.addEventListener("keyup", this.mouseWheelAndKey, false);
      document.addEventListener("touchstart", this.touchStart, false);
      document.addEventListener("touchend", this.touchEnd, false);
      window.addEventListener("hashchange", this.hashChange, false);
      // crutch //
      window.addEventListener("load", this.Load);
      // end crutch //

      /**
       * Enable scroll if decive don't have touch support
       */
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        if (!("ontouchstart" in window)) {
          document.body.style = "overflow: scroll;";
          document.documentElement.style = "overflow: scroll;";
        }
      }
    } else {
      document.attachEvent("onmousewheel", this.mouseWheelAndKey, false);
      document.attachEvent("onkeyup", this.mouseWheelAndKey, false);
    }

    return this;
  };

  /**
   * Build public functions
   * @return {[type]} [description]
   */
  fullScroll.prototype.buildPublicFunctions = function () {
    var mTouchStart = 0;
    var mTouchEnd = 0;
    var _self = this;

    this.mouseWheelAndKey = function (event) {
      // this is a my crutch
      var getSliderText = function (node) {
        if (node.classList.contains("scroll-text")) {
          return node;
        }
        if (node.parentNode.classList.contains("scroll-text")) {
          return node.parentNode;
        }
        return null;
      };

      var scrollText = getSliderText(event.target);
      if (scrollText !== null) {
        var hasVerticalScrollbar =
          scrollText.scrollHeight > scrollText.clientHeight;
        if (event.deltaY > 0) {
          if (hasVerticalScrollbar) {
            var endOfScroll =
              scrollText.scrollHeight - scrollText.scrollTop ===
              scrollText.clientHeight;
            if (!endOfScroll) return;
          }
        } else if (event.deltaY < 0) {
          if (hasVerticalScrollbar) {
            if (scrollText.scrollTop != 0) return;
          }
        }
      }
      // end of crutch
      if (event.deltaY > 0 || event.keyCode == 40) {
        _self.defaults.currentPosition++;
        _self.changeCurrentPosition(_self.defaults.currentPosition);
      } else if (event.deltaY < 0 || event.keyCode == 38) {
        _self.defaults.currentPosition--;
        _self.changeCurrentPosition(_self.defaults.currentPosition);
      }
      _self.removeEvents();
    };

    this.touchStart = function (event) {
      mTouchStart = parseInt(event.changedTouches[0].clientY);
      mTouchEnd = 0;
    };

    this.touchEnd = function (event) {
      mTouchEnd = parseInt(event.changedTouches[0].clientY);
      if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
        if (mTouchEnd > mTouchStart) {
          _self.defaults.currentPosition--;
        } else {
          _self.defaults.currentPosition++;
        }
        _self.changeCurrentPosition(_self.defaults.currentPosition);
      }
    };

    this.hashChange = function (event) {
      if (location) {
        var anchor = location.hash.replace("#", "").split("/")[0];
        if (anchor !== "") {
          if (isNaN(anchor * 1)) {
            _self.changeCurrentPosition(anchor);
          } else if (anchor < 0) {
            _self.changeCurrentPosition(0);
          } else if (anchor > _self.defaults.maxPosition) {
            _self.changeCurrentPosition(_self.defaults.maxPosition);
          } else {
            _self.defaults.currentPosition = anchor;
            _self.animateScroll();
          }
        }
      }
    };

    this.removeEvents = function () {
      if (document.addEventListener) {
        document.removeEventListener(
          "mousewheel",
          this.mouseWheelAndKey,
          false
        );
        document.removeEventListener("wheel", this.mouseWheelAndKey, false);
        document.removeEventListener("keyup", this.mouseWheelAndKey, false);
        document.removeEventListener("touchstart", this.touchStart, false);
        document.removeEventListener("touchend", this.touchEnd, false);
      } else {
        document.detachEvent("onmousewheel", this.mouseWheelAndKey, false);
        document.detachEvent("onkeyup", this.mouseWheelAndKey, false);
      }

      setTimeout(function () {
        _self.addEvents();
      }, 600);
    };

    this.animateScroll = function () {
      var animateTime = this.defaults.animateTime;
      var animateFunction = this.defaults.animateFunction;
      var position = this.defaults.currentPosition * 100;

      this.defaults.container.style.webkitTransform =
        "translateY(-" + position + "%)";
      this.defaults.container.style.mozTransform =
        "translateY(-" + position + "%)";
      this.defaults.container.style.msTransform =
        "translateY(-" + position + "%)";
      this.defaults.container.style.transform =
        "translateY(-" + position + "%)";
      this.defaults.container.style.webkitTransition =
        "all " + animateTime + "s " + animateFunction;
      this.defaults.container.style.mozTransition =
        "all " + animateTime + "s " + animateFunction;
      this.defaults.container.style.msTransition =
        "all " + animateTime + "s " + animateFunction;
      this.defaults.container.style.transition =
        "all " + animateTime + "s " + animateFunction;

      for (var i = 0; i < this.ul.childNodes.length; i++) {
        this.ul.childNodes[i].firstChild.className = this.updateClass(
          2,
          "active",
          this.ul.childNodes[i].firstChild.className
        );
        if (i == this.defaults.currentPosition) {
          this.ul.childNodes[i].firstChild.className = this.updateClass(
            1,
            "active",
            this.ul.childNodes[i].firstChild.className
          );
        }
      }

      if (this.defaults.menuElement) {
        for (var i = 0; i < this.defaults.menuElement.childNodes.length; i++) {
          this.defaults.menuElement.childNodes[i].className = this.updateClass(
            2,
            "active",
            this.defaults.menuElement.childNodes[i].className
          );
          if (i == this.defaults.currentPosition) {
            this.defaults.menuElement.childNodes[i].className =
              this.updateClass(
                1,
                "active",
                this.defaults.menuElement.childNodes[i].className
              );
          }
        }
      }
    };

    this.changeCurrentPosition = function (position) {
      if (position !== "") {
        if (isNaN(position * 1)) {
          if (_self.defaults.menuElement) {
            let el = document.querySelector('[href$="#' + position + '"]');
            if (el) {
              let index = Array.from(el.parentNode.parentNode.children).indexOf(
                el.parentNode
              );
              _self.defaults.currentPosition = index;
              _self.animateScroll();
            }
          }
        } else {
          _self.defaults.currentPosition = position;

          if (position < 0) {
            _self.defaults.currentPosition = 0;
            return;
          } else if (position > _self.defaults.maxPosition) {
            _self.defaults.currentPosition = _self.defaults.maxPosition;
            return;
          }

          if (_self.defaults.menuElement) {
            let elements = _self.defaults.menuElement.children;
            if (elements.item(_self.defaults.currentPosition)) {
              let currentItem = elements.item(_self.defaults.currentPosition)
                .children[0];
              location.hash = currentItem.getAttribute("href").split("#")[1];
            }
          } else {
            location.hash = _self.defaults.currentPosition;
          }
        }
        if (_self.params.onChangeCurrentPosition != undefined) {
          _self.params.onChangeCurrentPosition(_self);
        }
      }
    };

    // crutch //

    this.Load = function () {
      if (_self.params.onLoad != undefined) {
        _self.params.onLoad(_self);
      }
    };

    // end crutch //

    this.registerIeTags = function () {
      document.createElement("section");
    };

    this.updateClass = function (type, newClass, currentClass) {
      if (type == 1) {
        return (currentClass += " " + newClass);
      } else if (type == 2) {
        return currentClass.replace(newClass, "");
      }
    };

    return this;
  };
  window.fullScroll = fullScroll;
})();

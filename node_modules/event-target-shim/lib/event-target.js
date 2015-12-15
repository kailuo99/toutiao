/**
 * @author Toru Nagashima
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

"use strict";

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

var Commons = require("./commons");
var CustomEventTarget = require("./custom-event-target");
var EventWrapper = require("./event-wrapper");
var LISTENERS = Commons.LISTENERS;
var newNode = Commons.newNode;
var defineCustomEventTarget = CustomEventTarget.defineCustomEventTarget;
var createEventWrapper = EventWrapper.createEventWrapper;
var STOP_IMMEDIATE_PROPAGATION_FLAG = EventWrapper.STOP_IMMEDIATE_PROPAGATION_FLAG;

//-----------------------------------------------------------------------------
// Constants
//-----------------------------------------------------------------------------

/**
 * A flag which shows there is the native `EventTarget` interface object.
 *
 * @type {boolean}
 * @private
 */
var HAS_EVENTTARGET_INTERFACE = (
    typeof window !== "undefined" &&
    typeof window.EventTarget !== "undefined"
);

/**
 * A value of kind for listeners which are registered in the capturing phase.
 *
 * @type {number}
 * @private
 */
var CAPTURE = 1;

/**
 * A value of kind for listeners which are registered in the bubbling phase.
 *
 * @type {number}
 * @private
 */
var BUBBLE = 2;

//-----------------------------------------------------------------------------
// Public Interface
//-----------------------------------------------------------------------------

/**
 * An implementation for `EventTarget` interface.
 *
 * @constructor
 * @public
 */
var EventTarget = module.exports = function EventTarget() {
    if (this instanceof EventTarget) {
        // this[LISTENERS] is a Map.
        // Its key is event type.
        // Its value is ListenerNode object or null.
        //
        // interface ListenerNode {
        //     var listener: Function
        //     var kind: CAPTURE|BUBBLE|ATTRIBUTE
        //     var next: ListenerNode|null
        // }
        Object.defineProperty(this, LISTENERS, {value: Object.create(null)});
    }
    else if (arguments.length > 0) {
        var types = Array(arguments.length);
        for (var i = 0; i < arguments.length; ++i) {
            types[i] = arguments[i];
        }

        // To use to extend with attribute listener properties.
        // e.g.
        //     class MyCustomObject extends EventTarget("message", "error") {
        //         //...
        //     }
        return defineCustomEventTarget(EventTarget, types);
    }
    else {
        throw new TypeError("Cannot call a class as a function");
    }
};

EventTarget.prototype = Object.create(
    (HAS_EVENTTARGET_INTERFACE ? window.EventTarget : Object).prototype,
    {
        constructor: {
            value: EventTarget,
            writable: true,
            configurable: true
        },

        addEventListener: {
            value: function addEventListener(type, listener, capture) {
                if (listener == null) {
                    return false;
                }
                if (typeof listener !== "function") {
                    throw new TypeError("listener should be a function.");
                }

                var kind = (capture ? CAPTURE : BUBBLE);
                var node = this[LISTENERS][type];
                if (node == null) {
                    this[LISTENERS][type] = newNode(listener, kind);
                    return true;
                }

                var prev = null;
                while (node != null) {
                    if (node.listener === listener && node.kind === kind) {
                        // Should ignore a duplicated listener.
                        return false;
                    }
                    prev = node;
                    node = node.next;
                }

                prev.next = newNode(listener, kind);
                return true;
            },
            configurable: true,
            writable: true
        },

        removeEventListener: {
            value: function removeEventListener(type, listener, capture) {
                if (listener == null) {
                    return false;
                }

                var kind = (capture ? CAPTURE : BUBBLE);
                var prev = null;
                var node = this[LISTENERS][type];
                while (node != null) {
                    if (node.listener === listener && node.kind === kind) {
                        if (prev == null) {
                            this[LISTENERS][type] = node.next;
                        }
                        else {
                            prev.next = node.next;
                        }
                        return true;
                    }

                    prev = node;
                    node = node.next;
                }

                return false;
            },
            configurable: true,
            writable: true
        },

        dispatchEvent: {
            value: function dispatchEvent(event) {
                // If listeners aren't registered, terminate.
                var node = this[LISTENERS][event.type];
                if (node == null) {
                    return true;
                }

                // Since we cannot rewrite several properties, so wrap object.
                var wrapped = createEventWrapper(event, this);

                // This doesn't process capturing phase and bubbling phase.
                // This isn't participating in a tree.
                while (node != null) {
                    node.listener.call(this, wrapped);
                    if (wrapped[STOP_IMMEDIATE_PROPAGATION_FLAG]) {
                        break;
                    }
                    node = node.next;
                }

                return !wrapped.defaultPrevented;
            },
            configurable: true,
            writable: true
        }
    }
);

import Vue from 'vue';
import $ from 'jquery';
/**
 * @param {*} vnode 
 * @returns {*} component
 */
function getPageComponent (vnode) {
  let component = vnode.componentInstance;
  while (!(typeof component === 'undefined' || typeof component.right !== 'undefined')) {
    component = component.$parent;
  }
  return component;
}
/**
 * 
 * @param {*} el 
 * @param {*} binding 
 * @param {*} vnode 
 */
function setRight (el, binding, vnode) {
  let action = binding.value;
  let disabledClass = 'is-disabled';
  if (!action) {
    for (let key in binding.modifiers) {
      action = key;
    }
  }
  if (action) {
    let $el = $(el);
    let pageComponent = getPageComponent(vnode);
    if (!pageComponent) {
      return;
    }
    if (pageComponent.right(action)) {
      el.removeAttribute('disabled');
      $el.removeClass(disabledClass);
    } else {
      el.setAttribute('disabled', 'disabled');
      $el.addClass(disabledClass);
    }
  }
}


Vue.directive('right', {
  bind: function (el, binding, vnode) {
    setRight(el, binding, vnode);
  },
  update: function (el, binding, vnode) {
    setRight(el, binding, vnode);
  }
});

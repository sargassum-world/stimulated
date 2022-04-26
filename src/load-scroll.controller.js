import { Controller } from 'stimulus';

// Copied from https://stackoverflow.com/a/49186677
export const getScrollParent = (node) => {
  const regex = /(auto|scroll)/;
  const parents = (_node, ps) => {
    if (_node.parentNode === null) {
      return ps;
    }
    return parents(_node.parentNode, ps.concat([_node]));
  };

  const style = (_node, prop) =>
    getComputedStyle(_node, null).getPropertyValue(prop);
  const overflow = (_node) =>
    style(_node, 'overflow') +
    style(_node, 'overflow-y') +
    style(_node, 'overflow-x');
  const scroll = (_node) => regex.test(overflow(_node));

  const scrollParent = (_node) => {
    if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
      return;
    }

    const ps = parents(_node.parentNode, []);

    for (let i = 0; i < ps.length; i += 1) {
      if (scroll(ps[i])) {
        return ps[i];
      }
    }

    return document.scrollingElement || document.documentElement;
  };

  return scrollParent(node);
};

export default class extends Controller {
  connect() {
    const container = getScrollParent(this.element.parentElement);
    const position =
      this.element.offsetTop - this.element.getBoundingClientRect().height;
    console.log(
      container,
      this.element.offsetTop,
      this.element.getBoundingClientRect().height,
      position,
    );
    container.scrollTo({ top: position, behavior: 'smooth' });
  }
}

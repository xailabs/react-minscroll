import { PureComponent, PropTypes } from 'react';

import throttle from 'lodash.throttle';
import detectIt from 'detect-it';

/**
 * Only renders its children if the window is scrolled more than minScroll pixels vertically.
 */
export default class MinScroll extends PureComponent {
    static propTypes = {
        minScroll: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(window.Element)]),
        offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(window.Element)]),
        offsetNegative: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(window.Element)]),
        children: PropTypes.element
    }

    state = {
        isBelowScroll: false
    };

    constructor(props, context) {
        super(props, context);
        if (props.minScroll) {
            this.state = {
                isBelowScroll: this.getIsBelowScroll()
            };
        }
    }
    componentDidMount() {
        this._isMounted = true;
        window.addEventListener('scroll', this.handleScroll, detectIt.passiveEvents ? {passive:true} : false);
    }
    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this.handleScroll, detectIt.passiveEvents ? {passive:true} : false);
    }
    render() {
        if (this.state.isBelowScroll) return this.props.children;
        return null;
    }



    handleScroll = throttle(() => {
        if (this._isMounted) {
            if (this.getIsBelowScroll()) {
                if (!this.state.isBelowScroll) {
                    this.setState({isBelowScroll: true});
                }
            }
            else {
                if (this.state.isBelowScroll) {
                    this.setState({isBelowScroll: false});
                }
            }
        }
    }, 40);

    getIsBelowScroll() {
        const {minScroll, offset, offsetNegative} = this.props;
        if (!minScroll) return true;
        return document.documentElement.scrollTop > (
            this.toPixels(minScroll)
            + this.toPixels(offset)
            - this.toPixels(offsetNegative)
        );
    }

    toPixels(value) {
        if (!value) return 0;
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'function') {
            return this.toPixels(value());
        }
        if (typeof value === 'string') {
            return this.toPixels(document.querySelector(value));
        }
        if (value instanceof window.Element) {
            return value.offsetTop + value.offsetHeight;
        }
    }
}

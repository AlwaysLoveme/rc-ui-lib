import React, {
  useRef,
  Children,
  cloneElement,
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useContext,
} from 'react';
import cls from 'classnames';

import SwiperCore, { Pagination, Autoplay, Lazy } from 'swiper';

import { Swiper } from 'swiper/react';

import { SwipeProps, SwipeInstance } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

SwiperCore.use([Autoplay, Pagination, Lazy]);

const Swipe = forwardRef<SwipeInstance, SwipeProps>((props, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('swipe', prefixCls);

  const { children, className, autoplay, ...parseProsp } = parseOptions(props);
  const internalSwipeRef = useRef<SwipeInstance>(null);
  useImperativeHandle(ref, () => internalSwipeRef.current, [internalSwipeRef.current]);

  return (
    <Swiper
      className={cls(className, bem())}
      onSwiper={(swiper) => {
        internalSwipeRef.current = swiper;
      }}
      autoplay={autoplay as Swiper['autoplay']}
      {...parseProsp}
    >
      {Children.toArray(children)
        .filter(Boolean)
        .map((child: ReactElement) => cloneElement(child, { className: 'rc-swipe-item' }))}
    </Swiper>
  );
});

Swipe.defaultProps = {
  initialSwipe: 0,
  duration: 500,
  pagination: true,
};

function parseOptions(opts: SwipeProps) {
  const { initialSwipe, duration, onChange, vertical, showIndicators, ...rest } = opts;
  if (vertical) {
    rest.direction = 'vertical';
  }
  if (typeof showIndicators === 'boolean') {
    if (!showIndicators) rest.pagination = false;
  }

  rest.initialSlide = initialSwipe;
  rest.speed = duration;
  if (rest.autoplay && typeof rest.autoplay === 'number') {
    rest.autoplay = { delay: rest.autoplay, disableOnInteraction: false };
  }
  if (onChange) {
    rest.onSlideChange = (sw) => {
      const idx = opts.loop ? sw.realIndex : sw.activeIndex;
      onChange?.(idx);
    };
  }
  return rest;
}

export default Swipe;

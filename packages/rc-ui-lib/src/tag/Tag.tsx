import React, { useMemo, MouseEvent, useRef, useContext } from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

import Icon from '../icon';
import { TagProps } from './PropsType';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Tag: React.FC<TagProps> = (props) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('tag', prefixCls);

  const nodeRef = useRef(null);

  const onClose = (event: MouseEvent) => {
    event.stopPropagation();
    if (props.onClose) {
      props.onClose(event);
    }
  };

  const getStyle = useMemo(() => {
    if (props.plain) {
      return {
        color: props.textColor || props.color,
        borderColor: props.color,
      };
    }
    return {
      color: props.textColor,
      background: props.color,
    };
  }, [props.textColor, props.color, props.plain]);

  const renderTag = () => {
    const { type, mark, plain, round, size, closeable } = props;

    const classes: Record<string, unknown> = {
      mark,
      plain,
      round,
    };
    if (size) {
      classes[size] = size;
    }

    const CloseIcon = closeable && (
      <Icon name="cross" className={classnames(bem('close'))} onClick={onClose} />
    );

    return (
      <span
        ref={nodeRef}
        style={{ ...getStyle, ...props.style }}
        className={classnames(props.className, bem([classes, type]))}
        onClick={props.onClick}
      >
        {props.children}
        {CloseIcon}
      </span>
    );
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames="rc-fade"
      in={props.show}
      timeout={300}
      unmountOnExit
    >
      {renderTag()}
    </CSSTransition>
  );
};

Tag.defaultProps = {
  show: true,
  type: 'default',
};

export default Tag;

import React, { useEffect, createContext } from 'react';
import { CheckboxGroupProps } from './props';
import classnames from 'classnames';
import './style/index.scss';

const baseClass = 'r-checkbox-group';
// 创建组件间共享上下文
export const CheckboxGroupContext = createContext(null);

export type CheckboxGroupToggleAllOptions =
    | boolean
    | {
          checked?: boolean;
          // 跳过禁用的复选框
          skipDisabled?: boolean;
      };

const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
    const { model, direction = 'vertical', onChange, children } = props;

    useEffect(() => {
        onChange?.(model as any);
    }, [model]);

    const classStrig = classnames(`${baseClass}`, `${baseClass}--${direction}`);

    return (
        <div role="checkbox-group" className={classStrig}>
            <CheckboxGroupContext.Provider value={props as any}>
                {children}
            </CheckboxGroupContext.Provider>
        </div>
    );
};

export default CheckboxGroup;

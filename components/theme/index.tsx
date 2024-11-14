'use client';
import { ThemeType } from '@/share/types';
import { IconMoon, IconSun } from '@douyinfe/semi-icons';
import { Button, Tooltip } from '@douyinfe/semi-ui';
import { useEffect, useLayoutEffect, useState } from 'react';
import './index.css';

export const ThemeBtn = () => {
  const [theme, setTheme] = useState<ThemeType>('light');

  useLayoutEffect(() => {
    const _theme = (localStorage.getItem('theme') as ThemeType) ?? 'light';
    setTheme(_theme);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.removeAttribute('theme-mode');
    } else {
      body.setAttribute('theme-mode', 'dark');
    }
  }, [theme]);

  const handlerThemeChange = () => {
    const _theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', _theme);
    setTheme(_theme);
  };

  return (
    <Tooltip content={theme === 'light' ? '切换为暗色模式' : '切换为亮色模式'}>
      <Button
        theme="borderless"
        onClick={handlerThemeChange}
        className="theme-btn"
        icon={
          theme === 'light' ? (
            <IconMoon
              size="extra-large"
              aria-label="切换为暗色模式"
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
          ) : (
            <IconSun
              size="extra-large"
              aria-label="切换为亮色模式"
              style={{
                color: 'var(--semi-color-text-2)',
              }}
            />
          )
        }
      ></Button>
    </Tooltip>
  );
};

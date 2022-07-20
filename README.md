<h1 align="center">useNotice</h1>

使用 `usenotice` 为 React 应用程序添加标量的通知

## 安装
- ### yarn
  ```
  yarn add usenotice
  ```

- ### npm
  ```
  npm install usenotice
  ```

## 基础使用
```jsx
import useNotice from 'usenotice';

const Demo = () => {
    const notice = useNotice()
    return (
        <div>
            <button onClick={() => notice.success('success')}>
                Success Notice
            </button>
        </div>
    );
}
```

## API
#### useNotice
```tsx

```

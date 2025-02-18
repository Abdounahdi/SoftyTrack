// import { ConfigProvider, Tag } from 'antd'

export function TagCustomized({ children, colors: { bgColor = '#2E71E2', textColor = 'white' } }) {
  return (
    // <ConfigProvider
    //   theme={{
    //     components: {
    //       Tag: {
    //         colorText: textColor,
    //         defaultBg: bgColor,
    //         colorBorder: textColor,
    //       },
    //     },
    //   }}
    // >
    //   <Tag>{children}</Tag>
    // </ConfigProvider>
    <p className="tag_customized" style={{ backgroundColor: bgColor, color: textColor }}>
      {children}
    </p>
  )
}

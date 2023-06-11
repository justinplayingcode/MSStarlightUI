import { TooltipHost, TooltipOverflowMode } from "@fluentui/react"

export const tooltipPlainText = ( content: string, extraClassName?: string, id?: string) => {
  if(content === "") {
    return <div>--</div>
  }
  return (
    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
      <TooltipHost
        content={content}
        closeDelay={200}
        overflowMode={TooltipOverflowMode.Parent}
        hostClassName={extraClassName}
      >
        <span id={id}>{content}</span>
    </TooltipHost>
    </div>
  )
}

export const basicKeyValueRender = (key, value) => {
  return (
    <div className='basicInfoRender'
      style={{display: "flex", justifyContent: "space-between", width: "40%", height: "36px", margin: "0 0 4px 20px"}}
    >
      <div className='key'
        style={{ width: "30%", minWidth: "140px", backgroundColor: "#dddddd", display: "flex", alignItems: "center", paddingLeft: "8px" }}
      >{key}</div>
      <div className='value'
        style={{ width: "60%", display: "flex", alignItems: "center", paddingLeft: "8px"}}
      >{value}</div>
    </div>
  )
}
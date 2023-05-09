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
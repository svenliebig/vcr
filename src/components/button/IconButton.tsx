import React from "react"
import "./IconButton.less"

export interface Props {
    className?: string
    children?: React.ReactNode
    icon: string
    onClick?(): void
}

const IconButton = ({ className, onClick,children, icon }: Props) => <button className={`icon-button ${className || ""}`} onClick={onClick}>
    <span className={icon}></span>
    {children}
</button>

export default IconButton
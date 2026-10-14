import './Dialog.css'

export default function Dialog({
    isOpen,
    heading,
    confirmLabel,
    cancelLabel = 'Cancel',
    onConfirm,
    onCancle,
    children
}) {
    if (!isOpen) return null

    return (
        <div className="dialog-container" role="presentation">
            <div className="dialog-box" role="dialog" aria-modal="true" aria-label={heading}>
                <h2 className="dialog-heading">{heading}</h2>
                <div className="dialog-content">
                    {children}
                </div>
                <div className="dialog-buttons">
                    <button type="button" className="confirm" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                    <button type="button" className="cancle" onClick={onCancle}>
                        {cancelLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

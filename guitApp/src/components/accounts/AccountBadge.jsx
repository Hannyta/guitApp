import { AccountIcon } from './AccountIcon'

export function AccountBadge({ account, onClick }) {
  const content = (
    <>
      <span className="category-icon-circle" style={{ backgroundColor: account?.color ?? '#898781' }}>
        <AccountIcon icon={account?.icon} />
      </span>
      <span className="category-name">{account?.name ?? 'Sin cuenta'}</span>
      {account?.currency && <span className="account-currency-tag">{account.currency}</span>}
    </>
  )

  if (onClick) {
    return (
      <button type="button" className="category-chip category-chip-button" onClick={onClick}>
        {content}
      </button>
    )
  }

  return <span className="category-chip">{content}</span>
}

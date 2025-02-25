import PageHeading from '../PageHeading/PageHeading'

export default function PageActionLayout({ children, goBack, title }) {
  return (
    <div className="page_action_layout_container">
      <PageHeading title={title} goBack={goBack} />
      {children}
    </div>
  )
}

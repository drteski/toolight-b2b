const LangPage = async ({ params }: { params: any }) => {
  const { lang } = await params
  return <>{lang}</>
}

export default LangPage

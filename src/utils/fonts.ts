export function setupFont(link: string) {
  const linkNode = document.createElement('link')
  linkNode.type = 'text/css'
  linkNode.rel = 'stylesheet'
  linkNode.href = link
  document.head.appendChild(linkNode)
}

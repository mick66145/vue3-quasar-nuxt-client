
import { useRouter } from 'vue-router'

export const navigationProps = {
  to: [String, Object],
  replace: Boolean,
  href: String,
  target: String,
}

export default function useNavigation({
  to = null,
  replace = false,
  href = null,
  target = '_slef',
}) {
  // data
  const router = useRouter()

  // methods
  const onNavigation = () => {

    const navigationObj = {
      url: toValue(href),
      target: toValue(target),
      to: toValue(to),
      replace: toValue(replace),
    }

    if (navigationObj.href) {
      window.open(navigationObj.href, navigationObj.target)
    } else {
      router[navigationObj.replace ? 'replace' : 'push'](navigationObj.to)
    }
  }

  return {
    onNavigation,
  }
}

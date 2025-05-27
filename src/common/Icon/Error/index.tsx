import { MdErrorOutline } from 'react-icons/md'
import { useTranslation } from 'context/TranslationProvider'

const Error = () => {
  const { t } = useTranslation()

  return <MdErrorOutline title={t('error')} size={18} color="#ef4023" />
}

export default Error

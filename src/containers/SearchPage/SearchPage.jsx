import s from './SearchPage.module.css'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { getApiResource } from 'utils/network'
import { API_SEARCH } from 'consts/api'
import { withErrorApi } from 'hoc-helpers/withErrorApi'
import { getPeopleId, getPeopleImage } from 'services/getPeopleData'
import SearchPageInfo from 'components/SearchPage/SearchPageInfo/SearchPageInfo'
import { debounce } from 'lodash'
import UiInput from 'components/UI/UiInput/UiInput'

const SearchPage = ({ setErrorApi }) => {
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [people, setPeople] = useState([])

  const getResponse = async param => {
    const res = await getApiResource(API_SEARCH + param)

    if (res) {
      const peopleList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url)
        const img = getPeopleImage(id)

        return {
          id,
          name,
          img
        }
      })

      setPeople(peopleList)
      setErrorApi(false)
    } else {
      setErrorApi(true)
    }
  }

  useEffect(() => {
    getResponse('')
  }, [])

  //как эт работает я хз
  const debouncedGetResponse = useCallback(
    debounce(value => getResponse(value), 300),
    []
  )

  const handleInputChange = value => {
    setInputSearchValue(value)
    debouncedGetResponse(value)
  }
  return <>
    <h1 className='header__text'>Search</h1>
    <UiInput
      value={inputSearchValue}
      handleInputChange={handleInputChange}
      placeholder="Input hero name"
      classes={s.input__search}
    />
    <SearchPageInfo people={people} />
  </>
}

SearchPage.propTypes = {
  setErrorApi: PropTypes.func
}
export default withErrorApi(SearchPage)
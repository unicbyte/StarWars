import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { withErrorApi } from 'hoc-helpers/withErrorApi'
import PeopleList from 'components/PeoplePage/PeopleList/PeopleList'
import { getApiResource } from 'utils/network'
import { getPeopleId, getPeopleImage, getPeoplePageId } from 'services/getPeopleData'
import { API_PEOPLE } from 'consts/api'

import { useQueryParams } from 'hooks/useQueryParams'
import PeopleNavigation from 'components/PeoplePage/PeopleNavigation/PeopleNavigation'
// import s from './PeoplePage.module.css'
// import cn from 'classnames'

const PeoplePage = ({ setErrorApi }) => {
  const [people, setPeople] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)
  const [counterPage, setCounterPage] = useState(1)

  const query = useQueryParams()
  const queryPage = query.get('page')//мы достали номер текущей страницы

  useEffect(() => {
    getResource(API_PEOPLE + queryPage)
  })//вроде пустой массив нехорошо

  const getResource = async (url) => {
    const res = await getApiResource(url)
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
      setPrevPage(res.previous)
      setNextPage(res.next)
      setCounterPage(getPeoplePageId(url))
      setErrorApi(false)
    } else {
      setErrorApi(true)
    }
  }
  return <>
    <PeopleNavigation
      getResource={getResource}
      prevPage={prevPage}
      nextPage={nextPage}
      counterPage={counterPage}
    />
    {people && <PeopleList people={people} />}
  </>
}

PeoplePage.propTypes = {
  setErrorApi: PropTypes.func
}

export default withErrorApi(PeoplePage)

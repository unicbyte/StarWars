import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import s from './PeopleList.module.css'
// import cn from 'classnames'

const PeopleList = ({ people }) => {
  return (
    <ul className={s.list__container}>
      {people.map(({ id, name, img }) =>
        <li className={s.list__item} key={id}>
          <Link to={`/people/${id}`}>
            <img className={s.person__photo} src={img} alt={name} />
            <p>{name}</p>
          </Link>
        </li>)}
    </ul>
  )
}

PeopleList.propTypes = {
  people: PropTypes.array
}

export default PeopleList
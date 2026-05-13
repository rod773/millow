import { useScroll, useTransform, motion } from 'framer-motion'

const titleWords = ['Search it.', 'Explore it.', 'Buy it.']

const Search = ({ titleAnimKey }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <header>
      <motion.h2
        className="header__title"
        style={{ y, opacity }}
        key={titleAnimKey}
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: i * 0.3, ease: 'easeOut' }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.h2>
      <input
        type="text"
        className="header__search"
        placeholder="Enter an address, neighborhood, city, or ZIP code"
      />
    </header>
  )
}

export default Search

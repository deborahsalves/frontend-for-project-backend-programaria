import { useState, useEffect } from 'react'
import listaImg from '../assets/lista.svg'
import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

import Axios from 'axios'

import styles from '../styles/content.module.css'

export function Content() {
  const [repositories, setRepositories] = useState([])
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [quote, setQuote] = useState('')
  const [img, setImg] = useState('')
  const [success, setSuccess] = useState(false)
  const baseURL = 'https://project-programaria-backend.onrender.com/women'

  useEffect(() => {
    async function getData() {
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    getData()
  }, [])

  function handleInputValueName(event) {
    setName(event.target.value)
  }

  function handleInputValueBio(event) {
    setBio(event.target.value)
  }

  function handleInputValueImg(event) {
    setImg(event.target.value)
  }

  function handleInputValueQuote(event) {
    setQuote(event.target.value)
  }

  function handleCreateMessage(event) {
    event.preventDefault()

    console.log('mensagem enviada', name, quote, bio, img)

    async function sendData() {
      await Axios.post(baseURL, {
        name: name,
        quote: quote,
        bio: bio,
        img: img
      })
      const response = await Axios.get(baseURL)
      setRepositories(response.data)
    }
    sendData()

    setSuccess(true)
    setName('')
    setBio('')
    setImg('')
    setQuote('')
  }

  return (
    <>
      <Header
        title='Mulheres em Tech Brasil'
        subtitle='Conheça personalidades femininas que estão transformando a tecnologia no Brasil'
        image={listaImg}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsContainer}>
          <div className={styles.cardsRepoContainer}>
            {repositories.map((repo) => {
              return(
                <div key={repo._id} className={styles.cardRepo}>
                <div className={styles.cardImgContainer}>
                  <img className={styles.cardRepoImage} src={repo.img} />
                </div>
                <details>
                  <summary className={styles.cardRepoSummary}>
                    {repo.name}
                  </summary>
                  <p className={styles.cardRepoText}>{repo.bio}</p>
                  <q className={styles.cardRepoQuote}>{repo.quote}</q>
                </details>
              </div>
              )
            })}
          </div>
        </div>
      </div>
      <div >
        <h2 className={styles.projectsTitle}>Cadastre uma rainha tech:</h2>
        <form  className={styles.form} onSubmit={handleCreateMessage}>
          <input 
            onChange={handleInputValueName} 
            placeholder="Digite o nome"
            value={name}
            className={styles.formInput}
          />
          <textarea 
            onChange={handleInputValueImg} 
            placeholder="Digite o link da imagem"
            value={img}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueBio} 
            placeholder="Digite a minibiografia"
            value={bio}
            className={styles.formTextArea}
          />
          <textarea 
            onChange={handleInputValueQuote} 
            placeholder="Digite a citação"
            value={quote}
            className={styles.formTextArea}
          />
          <button className={styles.formButton} type="submit">Enviar mensagem</button>
          {success && <p>Cadastro realizado com sucesso.</p>}
        </form>
      </div>
      <Footer />
    </>
  )
}

//eslint-disable

import useCategories from 'hooks/useCategories'
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from 'react'
import './home.Module.scss'
import IsMedic from 'components/layout/isMedic/isMedic'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { getAuthorizedApi } from 'utils/api'
import SearchBar from '../../news/components/searchBar/searchBar'
import { useAuth } from 'context/AuthContext'
import CategoryCard from 'components/ui/categoryCard/categoryCard'

export default function NewsHome() {
  const { currentUser } = useAuth()
  const { data } = useCategories()
  const [recording, setRecording] = useState(false)
  //eslint-disable-next-line
  const mediaRecorderRef = useRef<any>(null)
  //eslint-disable-next-line
  const audioChunksRef = useRef<any[]>([])
  //eslint-disable-next-line
  const [audioBlob, setAudioBlob] = useState<any>(null)

  const [formData, setFormData] = useState<{
    categoryId: string
    title: string
    text: string
    //eslint-disable-next-line
    image: any
    //eslint-disable-next-line
    video: any
    //eslint-disable-next-line
    audio: any
  }>({
    //eslint-disable-next-line
    categoryId: '',
    title: '',
    text: '',
    image: null,
    video: null,
    audio: null,
  })

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream)
        //eslint-disable-next-line
        mediaRecorderRef.current.ondataavailable = (e: any) => {
          audioChunksRef.current.push(e.data)
        }
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/wav',
          })
          console.log(audioBlob)
          setAudioBlob(audioBlob)
          const audioUrl = URL.createObjectURL(audioBlob)
          setFormData((old) => {
            return { ...old, audio: audioUrl }
          })
          audioChunksRef.current = []
        }

        mediaRecorderRef.current.start()
        setRecording(true)
      })
      .catch((error) => {
        console.error('Error accessing the microphone', error)
      })
  }

  const stopRecording = () => {
    mediaRecorderRef.current.stop()
    setRecording(false)
  }

  const removeAudio = () => {
    setFormData((old) => {
      return { ...old, audio: null }
    })
    audioChunksRef.current = []
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setFormData((old) => {
      return { ...old, [name]: value }
    })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (formData.categoryId == '') return
    if (formData.title.trim() == '' || formData.text.trim() == '') return

    const body = new FormData()
    body.append('categoryId', formData.categoryId)
    body.append('title', formData.title)
    body.append('text', formData.text)
    body.append('image', formData.image)
    body.append('video', formData.video)
    if (formData.audio) body.append('audio', audioBlob, 'audio.wav')

    try {
      const authToken = await currentUser?.getIdToken()
      const api = getAuthorizedApi(authToken + '')

      await api.post('/article', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="news">
      <IsMedic>
        <form className="add__article" onSubmit={onSubmit}>
          <label className="add__article__title">Adauga un articol</label>
          <FormControl variant="outlined">
            <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              fullWidth
              value={formData.categoryId}
              label="Categorie"
              onChange={(e) =>
                //eslint-disable-next-line
                setFormData((old: any) => {
                  return { ...old, categoryId: e.target.value }
                })
              }
            >
              {/* eslint-disable-next-line */}
              {data.map((category: any) => {
                return (
                  <MenuItem value={category.id} key={category.id}>
                    {category.title}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <TextField
            label="Titlu"
            name="title"
            value={formData.title}
            onChange={onChange}
            fullWidth
            required
          ></TextField>
          <TextField
            label="Descriere"
            multiline
            name="text"
            value={formData.text}
            onChange={onChange}
            required
            fullWidth
          ></TextField>
          <div className="file__input">
            <label className="input__label">Imagine</label>
            <input
              type="file"
              onChange={(e) =>
                //eslint-disable-next-line
                setFormData((old: any) => {
                  if (e.target.files == null) return

                  return {
                    ...old,
                    image: e.target.files[0],
                  }
                })
              }
            />
          </div>

          <div className="file__input">
            <label className="input__label">Video</label>
            <input
              type="file"
              onChange={(e) =>
                //eslint-disable-next-line
                setFormData((old: any) => {
                  if (e.target.files == null) return

                  return { ...old, video: e.target.files[0] }
                })
              }
            />
          </div>
          <div className="file__input">
            <label className="input__label">Audio</label>
            <div className="input__buttons">
              <button
                style={{ width: 'fit-content', padding: '0 .25rem' }}
                type="button"
                onClick={recording ? stopRecording : startRecording}
              >
                {recording ? 'Stop Recording' : 'Start Recording'}
              </button>
              {formData.audio && (
                <button
                  type="button"
                  style={{ width: 'fit-content', padding: '0 .25rem' }}
                  onClick={removeAudio}
                >
                  Sterge
                </button>
              )}
            </div>
            {formData.audio && (
              <div>
                <audio src={formData.audio} controls />
              </div>
            )}
          </div>

          <Button variant="contained" type="submit">
            Adauga
          </Button>
        </form>
      </IsMedic>
      <label className="news__title">Cauta</label>
      <SearchBar />
      <label className="news__title">Noutati</label>
      <div className="news__categories">
        {/* eslint-disable-next-line */}
        {data?.map((category: any) => {
          return (
            <CategoryCard
              category={category}
              key={category.id}
              navigateTo={'/news/' + category.id}
            />
          )
        })}
      </div>
    </div>
  )
}

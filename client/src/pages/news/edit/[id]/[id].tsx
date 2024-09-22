import { useAuth } from 'context/AuthContext'
import useArticle from 'hooks/useArticle'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { SERVER_URL } from 'utils/api'
import articleService from 'services/articleService'
import { Button, TextField } from '@mui/material'
import './[id].Module.scss'
import BackButton from 'components/ui/backButton/backButton'

export default function ArticleEditId() {
  const { id } = useParams()
  const { currentUser, loading: loadingAuth } = useAuth()
  const navigate = useNavigate()

  const [recording, setRecording] = useState(false)
  //eslint-disable-next-line
  const mediaRecorderRef = useRef<any>(null)
  //eslint-disable-next-line
  const audioChunksRef = useRef<any[]>([])
  //eslint-disable-next-line
  const [audioBlob, setAudioBlob] = useState<any>(null)
  const { data: article, loading: loadingArticle } = useArticle(
    parseInt(id + ''),
  )
  // eslint-disable-next-line
  const [newData, setNewData] = useState<any>({
    title: '',
    text: '',
    confirmed: false,
  })
  // eslint-disable-next-line
  const [uploadedFiles, setUploadedFiles] = useState<{
    // eslint-disable-next-line
    imageURL: any
    // eslint-disable-next-line
    audioURL: any
    // eslint-disable-next-line
    videoURL: any
  }>({
    imageURL: '',
    audioURL: '',
    videoURL: '',
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

          setUploadedFiles({ ...uploadedFiles, audioURL: audioBlob })

          const audioUrl = URL.createObjectURL(audioBlob)
          //eslint-disable-next-line
          setNewData((old: any) => {
            return { ...old, audioURL: audioUrl }
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
    //eslint-disable-next-line

    setNewData({ ...newData, audioURL: null })

    if (article.audioURL) setUploadedFiles({ ...uploadedFiles, audioURL: null })
    else {
      setUploadedFiles({ ...uploadedFiles, audioURL: '' })
    }

    audioChunksRef.current = []
  }

  const onSave = async () => {
    const updateImage = uploadedFiles.imageURL !== ''
    const updateVideo = uploadedFiles.videoURL !== ''
    const updateAudio = uploadedFiles.audioURL !== ''

    const data = {
      title: newData.title,
      text: newData.text,
      confirmed: newData.confirmed,
      updateImage,
      updateVideo,
      updateAudio,
    }

    const body = new FormData()

    Object.entries(data).map(([key, value]) => {
      body.append(key, value)
    })

    if (updateImage && uploadedFiles.imageURL)
      body.append('image', uploadedFiles.imageURL)
    if (updateVideo && uploadedFiles.videoURL)
      body.append('video', uploadedFiles.videoURL)
    if (updateAudio && uploadedFiles.audioURL)
      body.append('audio', uploadedFiles.audioURL, 'audio.wav')

    try {
      const authToken = (await currentUser?.getIdToken()) as string
      await articleService.update(authToken, id + '', body)
      window.location.reload()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    if (loadingArticle) return

    if (article == null) return

    const value = {
      title: article.title,
      text: article.text,
      imageURL: article.imageURL ? SERVER_URL + article.imageURL : null,
      videoURL: article.videoURL ? SERVER_URL + article.videoURL : null,
      audioURL: article.audioURL ? SERVER_URL + article.audioURL : null,
      confirmed: article.confirmed,
    }

    setNewData(value)
  }, [loadingArticle])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target

    setNewData({ ...newData, [name]: value })
  }

  useEffect(() => {
    if (loadingArticle || loadingAuth) return

    if (article.userId != currentUser?.uid) {
      navigate(-1)
    }
  }, [loadingArticle, loadingAuth])

  if (loadingArticle) return <>loading...</>

  return (
    <>
      <div className="article__edit">
        <BackButton />
        <TextField
          label="Titlu"
          name="title"
          value={newData.title}
          onChange={handleChange}
          color="secondary"
          variant="filled"
        />
        <TextField
          label="Descriere"
          name="text"
          color="secondary"
          value={newData.text}
          onChange={handleChange}
          variant="filled"
        />
        <div className="edit__field edit__image">
          {newData.imageURL != null && (
            <img className="image" src={newData.imageURL} />
          )}
          <div className="edit__buttons">
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setNewData({ ...newData, imageURL: null })

                if (article.imageURL)
                  setUploadedFiles({ ...uploadedFiles, imageURL: null })
                else setUploadedFiles({ ...uploadedFiles, imageURL: '' })
              }}
            >
              Sterge Imagine
            </Button>
            <input
              type="file"
              onChange={(e) =>
                //eslint-disable-next-line
                setNewData((old: any) => {
                  if (e.target.files == null) return

                  setUploadedFiles({
                    ...uploadedFiles,
                    imageURL: e.target.files[0],
                  })

                  return {
                    ...old,
                    imageURL: URL.createObjectURL(e.target.files[0]),
                  }
                })
              }
            />
          </div>
        </div>

        <div className="edit__field edit__video">
          {newData.videoURL && (
            <video className="video" src={newData.videoURL} controls />
          )}
          <div className="edit__buttons">
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setNewData({ ...newData, videoURL: null })

                if (article.videoURL)
                  setUploadedFiles({ ...uploadedFiles, videoURL: null })
                else {
                  setUploadedFiles({ ...uploadedFiles, videoURL: '' })
                }
              }}
            >
              Sterge Video
            </Button>
            <input
              type="file"
              onChange={(e) =>
                //eslint-disable-next-line
                setNewData((old: any) => {
                  if (e.target.files == null) return

                  setUploadedFiles({
                    ...uploadedFiles,
                    videoURL: e.target.files[0],
                  })

                  return {
                    ...old,
                    videoURL: URL.createObjectURL(e.target.files[0]),
                  }
                })
              }
            />
          </div>
        </div>

        <div className="edit__field edit__audio">
          <div className="edit__buttons">
            <Button variant="contained" color="warning" onClick={removeAudio}>
              Sterge audio
            </Button>
            <button
              style={{ width: 'fit-content', padding: '0 .25rem' }}
              type="button"
              onClick={recording ? stopRecording : startRecording}
            >
              {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
          {newData.audioURL && (
            <div>
              <audio src={newData.audioURL} controls />
            </div>
          )}
        </div>
        <Button variant="contained" color="secondary" onClick={onSave}>
          Salveaza
        </Button>
      </div>
    </>
  )
}

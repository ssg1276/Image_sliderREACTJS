import React from 'react'
import { useState, useEffect } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import './App.css'

function App({ url, page, limit }) {
  const [image, setImage] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (url !== '') {
      fetchImages(url)
    }
  }, [url])

  async function fetchImages(getUrl) {
    try {
      setLoading(true)
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`)
      const data = await response.json()

      if (data) {
        setImage(data)
        setLoading(false)
      }
    } catch (e) {
      setErrorMsg(e.message)
      setLoading(false)
    }
  }

  console.log(image)
  if (loading) {
    return <>Wait! data is getting fetched</>
  }
  if (errorMsg !== null) {
    return <>{errorMsg}</>
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? image.length - 1 : currentSlide - 1)
  }
  function handleNext() {
    setCurrentSlide(currentSlide === image.length - 1 ? 0 : currentSlide + 1)
  }
  return (
    <div className=" flex relative justify-center items-center w-[600px] h-[450px]">
      <BsArrowLeftCircleFill
        className=" arrow arrow-left"
        onClick={handlePrevious}
      />
      {image && image.length
        ? image.map((imageItem, index) => (
            <img
              key={imageItem.id}
              src={imageItem.download_url}
              alt={imageItem.download_url}
              className={
                currentSlide === index
                  ? 'current-image'
                  : 'current-image hide-current-image'
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      {
        <span className="circle-indicators">
          {image && image.length
            ? image.map((_, index) => (
                <button
                  key={index}
                  className={
                    currentSlide === index
                      ? 'current-indicator'
                      : 'current-indicator inactive-indicator'
                  }
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))
            : null}
        </span>
      }
    </div>
  )
}

export default App

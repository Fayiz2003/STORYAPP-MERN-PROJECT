import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
    <footer className='shadow py-4 mt-4 text-light'>
        <div className="container">
            <div className="row pt-2">
                <div className="col-md-4">
                    <h5 className="fw-bold">
                        <span className="me-2"><i className="fa-solid fa-ghost text-danger"></i> </span>STORYVERSE
                    </h5>
                    <p className='text-dark'>Designed and built with all the love in the world by  Muhammed Fayiz.</p>
                    <p className='text-dark'>Code licensed Luminar, docs CC BY 3.0.</p>
                    <p className='text-dark'>Currently v5.3.2.</p>
                </div>
                <div className="col-md-2">
                    <h5 className="fw-bold">Links</h5>
                    <ul className="list-unstyled">
                        <li><a className="text-dark">Home</a></li>
                        <li><a className="text-dark">Login</a></li>
                        <li><a className="text-dark">Register</a></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h5 className="fw-bold">Guides</h5>
                    <ul className="list-unstyled">
                        <li><a className="text-dark">React</a></li>
                        <li><a className="text-dark">React Bootstrap</a></li>
                        <li><a className="text-dark">React Router</a></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5 className="fw-bold">Contact Us</h5>
                    <form className="d-flex">
                        <input type="email" className="form-control" placeholder="Enter your email here" aria-label="Email"/>
                        <button className="btn btn-primary ms-2" type="submit">
                            <span>&#9654;</span>
                        </button>
                    </form>
                    <div className="mt-3">
                        <a className="text-dark me-3"><i className="bi bi-twitter"></i></a>
                        <a className="text-dark me-3"><i className="bi bi-instagram"></i></a>
                        <a className="text-dark me-3"><i className="bi bi-facebook"></i></a>
                        <a className="text-dark me-3"><i className="bi bi-linkedin"></i></a>
                        <a className="text-dark me-3"><i className="bi bi-telephone"></i></a>
                    </div>
                </div>
            </div>
            <div className="text-center my-3 pb-2">
                <p className='text-dark'>&copy; May 2024 Batch, Self Project - Storyverse made with react.</p>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
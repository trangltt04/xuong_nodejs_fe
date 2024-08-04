import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import instance from '../api'
import { categorySchema } from '../utils/validation'
import { Category } from '../interface/Category'
import { CategoryContext } from '../contexts/CategoryContext'

const CategoryForm = () => {
	const { id } = useParams()
	const { handleCategory } = useContext(CategoryContext)
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<Category>({
		resolver: zodResolver(categorySchema)
	})

	useEffect(() => {
		if (id) {
			;(async () => {
				const { data } = await instance.get(`/categories/${id}`)
				reset(data.data)
			})()
		}
	}, [id, reset])

	return (
		<>
			<form onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}>
				<h1>{id ? 'Edit category' : 'Add category'}</h1>
				<div className='mb-3'>
					<label htmlFor='title' className='form-label'>
						title
					</label>
					<input className='form-control' type='text' {...register('title', { required: true })} />
					{errors.title && <span className='text-danger'>{errors.title.message}</span>}
				</div>

				<div className='mb-3'>
					<label htmlFor='description' className='form-label'>
						description
					</label>
					<textarea className='form-control' rows={4} {...register('description')} />
				</div>

				<div className='mb-3'>
					<button className='btn btn-primary w-100' type='submit'>
						{id ? 'Edit category' : 'Add category'}
					</button>
				</div>
			</form>
		</>
	)
}

export default CategoryForm

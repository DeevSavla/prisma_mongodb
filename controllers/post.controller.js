import {prisma} from '../prisma/index.js'

//create a new post 

const createPostController = async(req,res)=>{
    try {
        const {slug,title,body,authorId} = req.body
        if([slug,title,body,authorId].some((field)=>{
            return field.trim()===""
        })){
            throw new Error('Please provide all fields')
        }

        const result = await prisma.post.create({
            data:{
                slug,
                title,
                body,
                author:{connect:{id:authorId}}
                //In author field, we create a relation between id in User model and authorId in Post model 
            }
        })

        res.status(201).json({
            success:true,
            message:'Post created successfully',
            result
        })

    } catch (error) {
        throw new Error(error)
    }
}

const updatePostController = async(req,res)=>{

    const {id} = req.params
    const {title,body} = req.body

    try {
        const updatedPost = await prisma.post.update({
            where:{
                id:id
            },
            data:{
                title,
                body
            }
        })

        res.status(200).json({
            success:true,
            message:"Post edited successfully",
            updatedPost
        })

    } catch (error) {
        res.json({error:`Post with ${id} does not exist`})
        throw new Error(error)
    }
}

const deletePostController = async(req,res)=>{
    const {id} = req.params

    try {
        const result = await prisma.post.delete({
            where:{
                id:id,
            }
        })

        res.status(201).json({
            success:true,
            message:'Post deleted successfully',
            result
        })
    } catch (error) {
        res.json({error:`Post with ${id} does not exist`})
        throw new Error(error)
    }
}

const getAllPostsController = async (req,res)=>{
    try {
        const result = await prisma.post.findMany()
        res.status(201).json({
            success:true,
            message:'Fetched All Posts',
            result
        })
    } catch (error) {
        res.json({error:'No Posts Found'})
        throw new Error(error)
    }
}

export {
    createPostController,
    updatePostController,
    deletePostController,
    getAllPostsController
}
const projects = require('../model/productModel')


exports.addProjectController = async(req,res)=>{
    console.log('inside addProjectController');
    const userId = req.payload
    console.log(userId);
    // console.log(req.body);
    // console.log(req.file);
    const {title, language, github, website, overview} = req.body
    const projImage = req.file.filename
    //file is stored in server, so name given in server side need to give here,ie;filename, not originalname

    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json('Project already exist ')
        }
        else{
            const newProject = new projects({
                title,language,github,website,overview,projImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(error){
        res.status(401).json(error)
    }

    //res.status(200).json('request received')
}
exports.getAllProjectsController = async(req,res)=>{

    const searchKey = req.query.search ?? " ";
    console.log(searchKey);

    try{
        const query = {
            language :{$regex:searchKey,$options:'i'}
        }
        const allProjects = await projects.find(query)
        if(allProjects){
            res.status(200).json(allProjects)
        }
        else{
            res.status(406).json('No Projects')
        }
    }catch(error){
        res.status(401).json(error)
    }
}
exports.homeProjectsController = async(req,res)=>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(error){
        res.status(401).json(error)
    }
}

exports.userProjectController = async(req,res)=>{
    const userId = req.payload
    console.log(userId);
    try{
        const userProject = await projects.find({userId})
        if(userProject){
            res.status(200).json(userProject)
        }
            else{
                res.status(406).json('No Project Added Yet')
        }
    }catch(error){
            res.status(401).json(error)
    }

}

exports.deleteProjectController = async(req,res)=>{
    console.log('inside delete function');
    const {id} = req.params
    console.log(id);
    try{
        //deleteOne - return true or false
        //findByIdAndDelete
        const project = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(project)

    }catch(error){
        res.status(401).json(error)
    }
}

exports.editProjectController = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    
    const {title,language,github,website,overview,projImage} = req.body

    const uploadedImage = req.file? req.file.filename:projImage

    try{
        const existingProject = await projects.findByIdAndUpdate({_id:id}, {title,language,github,website,overview,projImage:uploadedImage,userId})
        await existingProject.save()
        res.status(200).json(existingProject)
    }catch(error){
        res.status(401).json(error)
    }

}
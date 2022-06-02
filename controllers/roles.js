const { request, response } = require('express');
const { Rolmodel } = require('../models');

// listart todos los roles
const getRoles = async(req = request, res = response) => {

   const {query = true, name} = req.query;

   try {

      if(name){
         const rolModel = await Rolmodel.findOne({
            where: {rol: name}
         })

         if(user){
            return res.status(200).json({
               ok: true,
               rolModel
            })
         }else {
            return res.status(404).json({
               ok: false,
               msg: `No existe el rol ${name}`
            })
         }

      }

      const roles = await Rolmodel.findAll({
         where: {
            state: query
         }
      })

      res.status(200).json({
         ok: true,
         roles
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

// listar un rol por id
const getRol = async(req = request, res = response) => {

   const {idRol} = req.params;

   try {

      const rol = await Rolmodel.findByPk(idRol)

      res.status(200).json({
         ok: true,
         rol
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

// crear un rol
const postRol = async(req = request, res = response) => {

   const { rol } = req.body;

   try {

      const data = rol.toUpperCase();
      const newRol = await Rolmodel.create({rol: data});

      res.status(201).json({
         ok: true,
         newRol
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

// actualizar un rol
const putRol = async(req = request, res = response) => {

   const {idRol} = req.params;
   const {rol} = req.body;

   try {

      const data = rol.toUpperCase()
      await Rolmodel.update({rol: data}, {
         where: {id: idRol}
      })

      res.status(200).json({
         ok: false,
         msg: 'Rol actualizado correctamente'
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

// eliminar un rol
const deleteRol = async(req = request, res = response) => {

   const {idRol} = req.params;

   try {

      await Rolmodel.update({state: false}, {
         where: {
            id: idRol
         }
      })

      res.status(200).json({
         ok: false,
         msg: 'Rol eliminado'
      })
      
   } catch (error) {
      console.log(error)
      res.status(500).json({
         ok: false,
         msg: "Hable con el administrador"
      })
   }
}

module.exports = {
   getRoles,
   getRol,
   postRol,
   putRol,
   deleteRol
}

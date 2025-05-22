const DAOUser=require('../../model/DAO/usuarioDAO.js')
const message =require('../../modulo/config.js')

const inserirUsuario = async (usuario, contentType) => {
    try {
        if (contentType && contentType.includes('application/json')) {

            if (usuario.nome == ''                || usuario.nome == undefined            || usuario.nome == null             || usuario.nome.length>100            ||
            usuario.email == ''                   || usuario.email == undefined           || usuario.email == null            || usuario.email.length>60            ||
            usuario.senha == ''                   || usuario.senha == undefined           || usuario.senha == null            || usuario.senha.length>20                   ||
            usuario.data_nascimento == ''         || usuario.data_nascimento == undefined || usuario.data_nascimento == null  || usuario.data_nascimento.length>10  ||
            usuario.palavra_chave == undefined    || usuario.palavra_chave .length>15     ||
            usuario.foto_perfil == undefined      || usuario.foto_perfil.length>500){

                return message.ERROR_REQUIRED_FIELDS
            }else{
                let result = await DAOUser.inserirUsuario(usuario)
                if (result) {
                    return message.SUCESS_CREATED_ITEM
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarUsuario = async (id, usuario, contentType) => {
    try {
        if (contentType == 'application/json') {
            if (usuario.nome == ''                || usuario.nome == undefined            || usuario.nome == null             || usuario.nome.length>100            ||
            usuario.email == ''                   || usuario.email == undefined           || usuario.email == null            || usuario.email.length>60            ||
            usuario.senha == ''                   || usuario.senha == undefined           || usuario.senha == null            || usuario.senha.length>20                   ||
            usuario.data_nascimento == ''         || usuario.data_nascimento == undefined || usuario.data_nascimento == null  || usuario.data_nascimento.length>10  ||
            usuario.palavra_chave == undefined    || usuario.palavra_chave .length>15     ||
            usuario.foto_perfil == undefined      || usuario.foto_perfil.length>500){
                console.log(usuario)
                return message.ERROR_REQUIRED_FIELDS
            }
            let result=await DAOUser.selectusuarioById(id)
            if (result != false || typeof(result)== 'object') {
                if (result.length>0) {
                    usuario.id=parseInt(id)
                    console.log(usuario)
                    let result = await DAOUser.updateUsuario(usuario)
                    if (result) {
                        return message.SUCESS_UPDATED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
       return message.ERROR_INTERNAL_SERVER_CONTROLLER 
    }
}

const excluirUsuario = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //função que verifica se ID existe no BD
            let results = await DAOUser.selectusuarioById(parseInt(id))

            if(results != false || typeof(results) == 'object'){
                //se exestir, faremos o delete
                if(results.length > 0){
                    //delete    
                    let result = await DAOUser.deleteUsuario(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return message.ERROR_NOT_FOUND
                }
                
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const listarUsuario = async function () {
    try {
        let dados={}
        let result = await DAOUser.selectAllUsuario()
        if (result != false || typeof(result)=='object') {
        
            if(result.length>0){
                dados.status=true
                dados.status_code=200,
                dados.itens=result.length
                dados.usuario=result
                return dados
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL
        }
        //cha,a a funcao para retornarusuarios cadastrados
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER ///500
    }
}

const buscarUsuario = async function (id) {
    let dados={}
    try {
        console.log(id)
        if (id == ''|| id == undefined|| id == null|| id<0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let result = await DAOUser.selectusuarioById(id)
            if (result != false || typeof(result)=='object'){
                if (result.length>0) {
                    dados={
                        status:true,
                        status_code:200,
                        usuario:result
                    }
                    return dados
                }else{
                    return message.ERROR_NOT_FOUND//404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports={
    inserirUsuario,
    listarUsuario,
    buscarUsuario,
    excluirUsuario,
    atualizarUsuario
}
const selectGeneroByIdFilme = async function(idFilme){
    try {
         let sql = `select tbl_genero.* from tbl_filme 
                                               inner join tbl_filme_genero
                                                 on tbl_filme.id = tbl_filme_genero.id_filme
                                               inner join tbl_genero
                                                 on tbl_genero.id_genero = tbl_filme_genero.id_genero
                     where tbl_filme_genero.id_filme = ${idFilme}`
                     
        let result = await prisma.$queryRawUnsafe(sql)
   
    if (result)
        return result
    else 
        return false
    } catch (error) {
        return false
    }
}

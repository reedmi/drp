package com.originspark.drp.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public abstract class BaseDAOSupport<T> implements BaseDAO<T>{

    @PersistenceContext
    protected EntityManager em;

    public void delete(T entity) {
        em.remove(entity);
    }

    @Transactional(readOnly=true)
    public T findById(Class<T> c,Long id) {
        return em.find(c, id);
    }

    public T save(T entity) {
        em.persist(entity);
        return entity;
    }

    public T update(T entity) {
        return em.merge(entity);
    }
    
    @Transactional(readOnly=true)
    public T getReferance(Class<T> c,Long id){
        return em.getReference(c, id);
    }

}

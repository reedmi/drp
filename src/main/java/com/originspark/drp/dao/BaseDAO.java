package com.originspark.drp.dao;

public interface BaseDAO<T> {
    T findById(Class<T> c, Long id);

    T getReferance(Class<T> c, Long id);

    T save(T entity);

    T update(T entity);

    void delete(T entity);
}

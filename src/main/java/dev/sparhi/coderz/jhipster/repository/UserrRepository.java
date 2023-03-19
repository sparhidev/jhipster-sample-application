package dev.sparhi.coderz.jhipster.repository;

import dev.sparhi.coderz.jhipster.domain.Userr;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Userr entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserrRepository extends JpaRepository<Userr, Long> {}

package dev.sparhi.coderz.jhipster.repository;

import dev.sparhi.coderz.jhipster.domain.Accountt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Accountt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccounttRepository extends JpaRepository<Accountt, Long> {}

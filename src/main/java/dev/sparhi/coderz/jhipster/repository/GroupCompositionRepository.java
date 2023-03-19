package dev.sparhi.coderz.jhipster.repository;

import dev.sparhi.coderz.jhipster.domain.GroupComposition;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the GroupComposition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupCompositionRepository extends JpaRepository<GroupComposition, Long> {}

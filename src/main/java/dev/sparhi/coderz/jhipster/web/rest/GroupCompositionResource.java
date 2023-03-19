package dev.sparhi.coderz.jhipster.web.rest;

import dev.sparhi.coderz.jhipster.domain.GroupComposition;
import dev.sparhi.coderz.jhipster.repository.GroupCompositionRepository;
import dev.sparhi.coderz.jhipster.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link dev.sparhi.coderz.jhipster.domain.GroupComposition}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GroupCompositionResource {

    private final Logger log = LoggerFactory.getLogger(GroupCompositionResource.class);

    private static final String ENTITY_NAME = "groupComposition";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GroupCompositionRepository groupCompositionRepository;

    public GroupCompositionResource(GroupCompositionRepository groupCompositionRepository) {
        this.groupCompositionRepository = groupCompositionRepository;
    }

    /**
     * {@code POST  /group-compositions} : Create a new groupComposition.
     *
     * @param groupComposition the groupComposition to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new groupComposition, or with status {@code 400 (Bad Request)} if the groupComposition has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/group-compositions")
    public ResponseEntity<GroupComposition> createGroupComposition(@Valid @RequestBody GroupComposition groupComposition)
        throws URISyntaxException {
        log.debug("REST request to save GroupComposition : {}", groupComposition);
        if (groupComposition.getId() != null) {
            throw new BadRequestAlertException("A new groupComposition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GroupComposition result = groupCompositionRepository.save(groupComposition);
        return ResponseEntity
            .created(new URI("/api/group-compositions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /group-compositions/:id} : Updates an existing groupComposition.
     *
     * @param id the id of the groupComposition to save.
     * @param groupComposition the groupComposition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated groupComposition,
     * or with status {@code 400 (Bad Request)} if the groupComposition is not valid,
     * or with status {@code 500 (Internal Server Error)} if the groupComposition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/group-compositions/{id}")
    public ResponseEntity<GroupComposition> updateGroupComposition(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody GroupComposition groupComposition
    ) throws URISyntaxException {
        log.debug("REST request to update GroupComposition : {}, {}", id, groupComposition);
        if (groupComposition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, groupComposition.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!groupCompositionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        GroupComposition result = groupCompositionRepository.save(groupComposition);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, groupComposition.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /group-compositions/:id} : Partial updates given fields of an existing groupComposition, field will ignore if it is null
     *
     * @param id the id of the groupComposition to save.
     * @param groupComposition the groupComposition to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated groupComposition,
     * or with status {@code 400 (Bad Request)} if the groupComposition is not valid,
     * or with status {@code 404 (Not Found)} if the groupComposition is not found,
     * or with status {@code 500 (Internal Server Error)} if the groupComposition couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/group-compositions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<GroupComposition> partialUpdateGroupComposition(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody GroupComposition groupComposition
    ) throws URISyntaxException {
        log.debug("REST request to partial update GroupComposition partially : {}, {}", id, groupComposition);
        if (groupComposition.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, groupComposition.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!groupCompositionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<GroupComposition> result = groupCompositionRepository
            .findById(groupComposition.getId())
            .map(existingGroupComposition -> {
                if (groupComposition.getGroup() != null) {
                    existingGroupComposition.setGroup(groupComposition.getGroup());
                }
                if (groupComposition.getAccount() != null) {
                    existingGroupComposition.setAccount(groupComposition.getAccount());
                }

                return existingGroupComposition;
            })
            .map(groupCompositionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, groupComposition.getId().toString())
        );
    }

    /**
     * {@code GET  /group-compositions} : get all the groupCompositions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of groupCompositions in body.
     */
    @GetMapping("/group-compositions")
    public List<GroupComposition> getAllGroupCompositions() {
        log.debug("REST request to get all GroupCompositions");
        return groupCompositionRepository.findAll();
    }

    /**
     * {@code GET  /group-compositions/:id} : get the "id" groupComposition.
     *
     * @param id the id of the groupComposition to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the groupComposition, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/group-compositions/{id}")
    public ResponseEntity<GroupComposition> getGroupComposition(@PathVariable Long id) {
        log.debug("REST request to get GroupComposition : {}", id);
        Optional<GroupComposition> groupComposition = groupCompositionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(groupComposition);
    }

    /**
     * {@code DELETE  /group-compositions/:id} : delete the "id" groupComposition.
     *
     * @param id the id of the groupComposition to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/group-compositions/{id}")
    public ResponseEntity<Void> deleteGroupComposition(@PathVariable Long id) {
        log.debug("REST request to delete GroupComposition : {}", id);
        groupCompositionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

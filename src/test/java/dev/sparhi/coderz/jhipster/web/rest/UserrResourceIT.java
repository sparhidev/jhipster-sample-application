package dev.sparhi.coderz.jhipster.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import dev.sparhi.coderz.jhipster.IntegrationTest;
import dev.sparhi.coderz.jhipster.domain.Userr;
import dev.sparhi.coderz.jhipster.repository.UserrRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UserrResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserrResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/userrs";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserrRepository userrRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserrMockMvc;

    private Userr userr;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Userr createEntity(EntityManager em) {
        Userr userr = new Userr().name(DEFAULT_NAME);
        return userr;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Userr createUpdatedEntity(EntityManager em) {
        Userr userr = new Userr().name(UPDATED_NAME);
        return userr;
    }

    @BeforeEach
    public void initTest() {
        userr = createEntity(em);
    }

    @Test
    @Transactional
    void createUserr() throws Exception {
        int databaseSizeBeforeCreate = userrRepository.findAll().size();
        // Create the Userr
        restUserrMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userr)))
            .andExpect(status().isCreated());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeCreate + 1);
        Userr testUserr = userrList.get(userrList.size() - 1);
        assertThat(testUserr.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void createUserrWithExistingId() throws Exception {
        // Create the Userr with an existing ID
        userr.setId(1L);

        int databaseSizeBeforeCreate = userrRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserrMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userr)))
            .andExpect(status().isBadRequest());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = userrRepository.findAll().size();
        // set the field null
        userr.setName(null);

        // Create the Userr, which fails.

        restUserrMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userr)))
            .andExpect(status().isBadRequest());

        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUserrs() throws Exception {
        // Initialize the database
        userrRepository.saveAndFlush(userr);

        // Get all the userrList
        restUserrMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userr.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }

    @Test
    @Transactional
    void getUserr() throws Exception {
        // Initialize the database
        userrRepository.saveAndFlush(userr);

        // Get the userr
        restUserrMockMvc
            .perform(get(ENTITY_API_URL_ID, userr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userr.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    void getNonExistingUserr() throws Exception {
        // Get the userr
        restUserrMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUserr() throws Exception {
        // Initialize the database
        userrRepository.saveAndFlush(userr);

        int databaseSizeBeforeUpdate = userrRepository.findAll().size();

        // Update the userr
        Userr updatedUserr = userrRepository.findById(userr.getId()).get();
        // Disconnect from session so that the updates on updatedUserr are not directly saved in db
        em.detach(updatedUserr);
        updatedUserr.name(UPDATED_NAME);

        restUserrMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserr.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserr))
            )
            .andExpect(status().isOk());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
        Userr testUserr = userrList.get(userrList.size() - 1);
        assertThat(testUserr.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void putNonExistingUserr() throws Exception {
        int databaseSizeBeforeUpdate = userrRepository.findAll().size();
        userr.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserrMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userr.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userr))
            )
            .andExpect(status().isBadRequest());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserr() throws Exception {
        int databaseSizeBeforeUpdate = userrRepository.findAll().size();
        userr.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserrMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userr))
            )
            .andExpect(status().isBadRequest());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserr() throws Exception {
        int databaseSizeBeforeUpdate = userrRepository.findAll().size();
        userr.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserrMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userr)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserrWithPatch() throws Exception {
        // Initialize the database
        userrRepository.saveAndFlush(userr);

        int databaseSizeBeforeUpdate = userrRepository.findAll().size();

        // Update the userr using partial update
        Userr partialUpdatedUserr = new Userr();
        partialUpdatedUserr.setId(userr.getId());

        restUserrMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserr.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserr))
            )
            .andExpect(status().isOk());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
        Userr testUserr = userrList.get(userrList.size() - 1);
        assertThat(testUserr.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    void fullUpdateUserrWithPatch() throws Exception {
        // Initialize the database
        userrRepository.saveAndFlush(userr);

        int databaseSizeBeforeUpdate = userrRepository.findAll().size();

        // Update the userr using partial update
        Userr partialUpdatedUserr = new Userr();
        partialUpdatedUserr.setId(userr.getId());

        partialUpdatedUserr.name(UPDATED_NAME);

        restUserrMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserr.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserr))
            )
            .andExpect(status().isOk());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
        Userr testUserr = userrList.get(userrList.size() - 1);
        assertThat(testUserr.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingUserr() throws Exception {
        int databaseSizeBeforeUpdate = userrRepository.findAll().size();
        userr.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserrMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userr.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userr))
            )
            .andExpect(status().isBadRequest());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserr() throws Exception {
        int databaseSizeBeforeUpdate = userrRepository.findAll().size();
        userr.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserrMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userr))
            )
            .andExpect(status().isBadRequest());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserr() throws Exception {
        int databaseSizeBeforeUpdate = userrRepository.findAll().size();
        userr.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserrMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(userr)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Userr in the database
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserr() throws Exception {
        // Initialize the database
        userrRepository.saveAndFlush(userr);

        int databaseSizeBeforeDelete = userrRepository.findAll().size();

        // Delete the userr
        restUserrMockMvc
            .perform(delete(ENTITY_API_URL_ID, userr.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Userr> userrList = userrRepository.findAll();
        assertThat(userrList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

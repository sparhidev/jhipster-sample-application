package dev.sparhi.coderz.jhipster.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import dev.sparhi.coderz.jhipster.IntegrationTest;
import dev.sparhi.coderz.jhipster.domain.GroupComposition;
import dev.sparhi.coderz.jhipster.repository.GroupCompositionRepository;
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
 * Integration tests for the {@link GroupCompositionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class GroupCompositionResourceIT {

    private static final Long DEFAULT_GROUP = 1L;
    private static final Long UPDATED_GROUP = 2L;

    private static final Long DEFAULT_ACCOUNT = 1L;
    private static final Long UPDATED_ACCOUNT = 2L;

    private static final String ENTITY_API_URL = "/api/group-compositions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private GroupCompositionRepository groupCompositionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGroupCompositionMockMvc;

    private GroupComposition groupComposition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupComposition createEntity(EntityManager em) {
        GroupComposition groupComposition = new GroupComposition().group(DEFAULT_GROUP).account(DEFAULT_ACCOUNT);
        return groupComposition;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupComposition createUpdatedEntity(EntityManager em) {
        GroupComposition groupComposition = new GroupComposition().group(UPDATED_GROUP).account(UPDATED_ACCOUNT);
        return groupComposition;
    }

    @BeforeEach
    public void initTest() {
        groupComposition = createEntity(em);
    }

    @Test
    @Transactional
    void createGroupComposition() throws Exception {
        int databaseSizeBeforeCreate = groupCompositionRepository.findAll().size();
        // Create the GroupComposition
        restGroupCompositionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isCreated());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeCreate + 1);
        GroupComposition testGroupComposition = groupCompositionList.get(groupCompositionList.size() - 1);
        assertThat(testGroupComposition.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testGroupComposition.getAccount()).isEqualTo(DEFAULT_ACCOUNT);
    }

    @Test
    @Transactional
    void createGroupCompositionWithExistingId() throws Exception {
        // Create the GroupComposition with an existing ID
        groupComposition.setId(1L);

        int databaseSizeBeforeCreate = groupCompositionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupCompositionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkGroupIsRequired() throws Exception {
        int databaseSizeBeforeTest = groupCompositionRepository.findAll().size();
        // set the field null
        groupComposition.setGroup(null);

        // Create the GroupComposition, which fails.

        restGroupCompositionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isBadRequest());

        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAccountIsRequired() throws Exception {
        int databaseSizeBeforeTest = groupCompositionRepository.findAll().size();
        // set the field null
        groupComposition.setAccount(null);

        // Create the GroupComposition, which fails.

        restGroupCompositionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isBadRequest());

        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllGroupCompositions() throws Exception {
        // Initialize the database
        groupCompositionRepository.saveAndFlush(groupComposition);

        // Get all the groupCompositionList
        restGroupCompositionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupComposition.getId().intValue())))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP.intValue())))
            .andExpect(jsonPath("$.[*].account").value(hasItem(DEFAULT_ACCOUNT.intValue())));
    }

    @Test
    @Transactional
    void getGroupComposition() throws Exception {
        // Initialize the database
        groupCompositionRepository.saveAndFlush(groupComposition);

        // Get the groupComposition
        restGroupCompositionMockMvc
            .perform(get(ENTITY_API_URL_ID, groupComposition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(groupComposition.getId().intValue()))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP.intValue()))
            .andExpect(jsonPath("$.account").value(DEFAULT_ACCOUNT.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingGroupComposition() throws Exception {
        // Get the groupComposition
        restGroupCompositionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingGroupComposition() throws Exception {
        // Initialize the database
        groupCompositionRepository.saveAndFlush(groupComposition);

        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();

        // Update the groupComposition
        GroupComposition updatedGroupComposition = groupCompositionRepository.findById(groupComposition.getId()).get();
        // Disconnect from session so that the updates on updatedGroupComposition are not directly saved in db
        em.detach(updatedGroupComposition);
        updatedGroupComposition.group(UPDATED_GROUP).account(UPDATED_ACCOUNT);

        restGroupCompositionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedGroupComposition.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedGroupComposition))
            )
            .andExpect(status().isOk());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
        GroupComposition testGroupComposition = groupCompositionList.get(groupCompositionList.size() - 1);
        assertThat(testGroupComposition.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testGroupComposition.getAccount()).isEqualTo(UPDATED_ACCOUNT);
    }

    @Test
    @Transactional
    void putNonExistingGroupComposition() throws Exception {
        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();
        groupComposition.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupCompositionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, groupComposition.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchGroupComposition() throws Exception {
        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();
        groupComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupCompositionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamGroupComposition() throws Exception {
        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();
        groupComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupCompositionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateGroupCompositionWithPatch() throws Exception {
        // Initialize the database
        groupCompositionRepository.saveAndFlush(groupComposition);

        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();

        // Update the groupComposition using partial update
        GroupComposition partialUpdatedGroupComposition = new GroupComposition();
        partialUpdatedGroupComposition.setId(groupComposition.getId());

        restGroupCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGroupComposition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGroupComposition))
            )
            .andExpect(status().isOk());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
        GroupComposition testGroupComposition = groupCompositionList.get(groupCompositionList.size() - 1);
        assertThat(testGroupComposition.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testGroupComposition.getAccount()).isEqualTo(DEFAULT_ACCOUNT);
    }

    @Test
    @Transactional
    void fullUpdateGroupCompositionWithPatch() throws Exception {
        // Initialize the database
        groupCompositionRepository.saveAndFlush(groupComposition);

        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();

        // Update the groupComposition using partial update
        GroupComposition partialUpdatedGroupComposition = new GroupComposition();
        partialUpdatedGroupComposition.setId(groupComposition.getId());

        partialUpdatedGroupComposition.group(UPDATED_GROUP).account(UPDATED_ACCOUNT);

        restGroupCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedGroupComposition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedGroupComposition))
            )
            .andExpect(status().isOk());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
        GroupComposition testGroupComposition = groupCompositionList.get(groupCompositionList.size() - 1);
        assertThat(testGroupComposition.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testGroupComposition.getAccount()).isEqualTo(UPDATED_ACCOUNT);
    }

    @Test
    @Transactional
    void patchNonExistingGroupComposition() throws Exception {
        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();
        groupComposition.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, groupComposition.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchGroupComposition() throws Exception {
        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();
        groupComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isBadRequest());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamGroupComposition() throws Exception {
        int databaseSizeBeforeUpdate = groupCompositionRepository.findAll().size();
        groupComposition.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restGroupCompositionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(groupComposition))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the GroupComposition in the database
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteGroupComposition() throws Exception {
        // Initialize the database
        groupCompositionRepository.saveAndFlush(groupComposition);

        int databaseSizeBeforeDelete = groupCompositionRepository.findAll().size();

        // Delete the groupComposition
        restGroupCompositionMockMvc
            .perform(delete(ENTITY_API_URL_ID, groupComposition.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GroupComposition> groupCompositionList = groupCompositionRepository.findAll();
        assertThat(groupCompositionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

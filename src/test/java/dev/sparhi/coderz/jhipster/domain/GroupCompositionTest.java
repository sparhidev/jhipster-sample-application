package dev.sparhi.coderz.jhipster.domain;

import static org.assertj.core.api.Assertions.assertThat;

import dev.sparhi.coderz.jhipster.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class GroupCompositionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupComposition.class);
        GroupComposition groupComposition1 = new GroupComposition();
        groupComposition1.setId(1L);
        GroupComposition groupComposition2 = new GroupComposition();
        groupComposition2.setId(groupComposition1.getId());
        assertThat(groupComposition1).isEqualTo(groupComposition2);
        groupComposition2.setId(2L);
        assertThat(groupComposition1).isNotEqualTo(groupComposition2);
        groupComposition1.setId(null);
        assertThat(groupComposition1).isNotEqualTo(groupComposition2);
    }
}

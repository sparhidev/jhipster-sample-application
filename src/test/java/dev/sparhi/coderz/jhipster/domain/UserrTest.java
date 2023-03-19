package dev.sparhi.coderz.jhipster.domain;

import static org.assertj.core.api.Assertions.assertThat;

import dev.sparhi.coderz.jhipster.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserrTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Userr.class);
        Userr userr1 = new Userr();
        userr1.setId(1L);
        Userr userr2 = new Userr();
        userr2.setId(userr1.getId());
        assertThat(userr1).isEqualTo(userr2);
        userr2.setId(2L);
        assertThat(userr1).isNotEqualTo(userr2);
        userr1.setId(null);
        assertThat(userr1).isNotEqualTo(userr2);
    }
}

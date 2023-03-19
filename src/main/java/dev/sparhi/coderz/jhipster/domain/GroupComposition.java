package dev.sparhi.coderz.jhipster.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A GroupComposition.
 */
@Entity
@Table(name = "group_composition")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class GroupComposition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "jhi_group", nullable = false)
    private Long group;

    @NotNull
    @Column(name = "account", nullable = false)
    private Long account;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public GroupComposition id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGroup() {
        return this.group;
    }

    public GroupComposition group(Long group) {
        this.setGroup(group);
        return this;
    }

    public void setGroup(Long group) {
        this.group = group;
    }

    public Long getAccount() {
        return this.account;
    }

    public GroupComposition account(Long account) {
        this.setAccount(account);
        return this;
    }

    public void setAccount(Long account) {
        this.account = account;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GroupComposition)) {
            return false;
        }
        return id != null && id.equals(((GroupComposition) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GroupComposition{" +
            "id=" + getId() +
            ", group=" + getGroup() +
            ", account=" + getAccount() +
            "}";
    }
}

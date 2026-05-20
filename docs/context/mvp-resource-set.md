# SERAYA MVP Resource Set

This is the first proposed resource set distilled from local Notion notes. The MVP should start with link/resource cards and a clear disclaimer, not scraped medical content.

## Disclaimer

Resources are for education and support only. They do not replace medical advice. For severe symptoms, contact a doctor, palliative-care team, emergency services, or a local healthcare provider.

## Recommended MVP Sources

### Clinical Explanation

| Source | Use for | MVP handling |
| --- | --- | --- |
| NCI / Cancer.gov | Cancer, cancer pain, fatigue, nausea, palliative/supportive care, patient education | Primary cancer education source. Link first; ingest only if reuse terms are checked. |
| NHS Website Content API | General conditions, symptoms, medicines, and when to seek help | Use API rather than scraping if content is integrated later. |
| MedlinePlus | Plain-language health explanations | Use as a backup patient-friendly reference; watch for third-party copyrighted sections. |

### Elderly And Caregiver Support

| Source | Use for | MVP handling |
| --- | --- | --- |
| National Institute on Aging | Aging, caregiving, dementia, advance care planning, caregiver guidance | Strong fit for caregiver education and future support cards. |

### Malaysia-First Support And Referral

| Source | Use for | MVP handling |
| --- | --- | --- |
| Hospis Malaysia | Local palliative-care support and patient/caregiver resources | Include as a local referral/support card. |
| National Cancer Society Malaysia | Cancer education, care, support services, screening, support centres | Include as a local support card. |
| MAKNA | Cancer care, detection, awareness, emotional support, and research | Include as a local support card after URL/details are verified. |
| Cancer Research Malaysia | Malaysian/Asian cancer research and patient navigation | Include as a local support/research card after URL/details are verified. |
| MOH Malaysia / MyHEALTH / InfoSihat | Official Malaysian health education and service context | Include as verified outbound links first. |
| KKMNOW / MOH open data | Malaysia public-health datasets and context | Use for data context, not patient advice. |

## Exclude From MVP For Now

- Do not include `cancerlinkfoundation.org` as written; the Notion notes flagged it as unsafe/inappropriate in its current state.
- Do not use old `cancerhelp.org.uk` links; replace with current Cancer Research UK pages if needed.
- Do not scrape Mayo Clinic, Cleveland Clinic, WebMD, Healthline, NICE, or private hospital sites unless explicit permission or licensing is obtained.

## Implementation Notes

- Start with a small, curated list of resource cards in the caregiver app.
- Prefer Malaysia-first support resources when the user needs local action.
- Label overseas resources clearly so users know they are educational references, not local service referrals.
- Store resource metadata separately from medical alert logic; resources should support decisions, not imply diagnosis.

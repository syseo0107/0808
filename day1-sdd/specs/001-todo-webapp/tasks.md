---
description: "Task list for Todo 웹앱 implementation"
---

# Tasks: Todo 웹앱

**Input**: Design documents from `/specs/001-todo-webapp`

**Prerequisites**: plan.md, spec.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1, US2, US3

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 [P] [US1] 검증된 HTML 구조를 `index.html`에 유지한다.
- [ ] T002 [P] [US1] 기본 스타일을 `style.css`에 반영한다.
- [ ] T003 [P] [US1] `script.js`에 초기 DOM 요소와 이벤트 바인딩을 구성한다.

## Phase 2: User Story 1 - 할 일 추가 및 정렬 (Priority: P1)

- [ ] T011 [US1] `index.html`에 할 일 텍스트 입력, 날짜 입력, 등록 버튼 요소를 구현한다.
- [ ] T012 [US1] `script.js`에서 새 할 일을 로컬 스토리지에 저장하고 목록에 추가하는 기능을 구현한다.
- [ ] T013 [US1] `script.js`에서 마감일이 가까운 순서로 할 일 목록을 정렬한다.
- [ ] T014 [US1] `script.js`에서 빈 입력값을 검증하고 항목 추가를 차단한다.

## Phase 3: User Story 2 - 완료 체크 및 삭제 (Priority: P2)

- [ ] T021 [US2] `script.js`에서 할 일의 완료 체크 기능을 구현한다.
- [ ] T022 [US2] `script.js`에서 할 일 항목 삭제 기능을 구현한다.
- [ ] T023 [US2] 완료 상태와 삭제 상태가 로컬 스토리지에 저장되도록 보장한다.

## Phase 4: User Story 3 - 다크 모드 (Priority: P3)

- [ ] T031 [US3] `index.html`에 다크 모드 토글 버튼을 추가한다.
- [ ] T032 [US3] `script.js`에서 토글 상태를 즉시 적용하고 저장한다.
- [ ] T033 [US3] 새로고침 이후에도 다크 모드 설정이 유지되도록 로드 로직을 구현한다.

## Phase 5: Polish & Validation

- [ ] T041 [P] [US1/US2] 완료/전체 개수 상태가 `index.html`에 정확히 표시되는지 확인한다.
- [ ] T042 [P] [US1/US2] 리스트가 비어 있을 때 안내 메시지를 표시한다.
- [ ] T043 [P] [US1/US2/US3] 스펙과 구현이 일치하는지 검토한다.
- [ ] T044 [P] [US1/US2/US3] 수동 브라우저 테스트로 주요 시나리오를 확인한다.

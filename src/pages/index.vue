<template lang="pug">
  main.main
    .hero.hero-lg.full-width-hero
      h2.hero_title
        img.logo_img(src="~/assets/images/sprintus_logo_white.svg" alt="sprintus")
        span.fonetics [spríntəs]
      p.hero_description チームの仲間と共にこの一週間を駆けぬける
      button.btn.btn-primary.hero_btn(@click="moveToLogin") Login
    .container.container-padding
      .columns.columns-first
        .column.col-12
          .in-column.caution
            h3 ※ご注意
            p
            | Sprintusは現在開発中でEarly Alpha版として試用することができます。
            | 予告せず機能が追加、削除されたり、保存されたデータが正常に読みだせなくなる可能性があります。
            | 使用中に起きた問題については一切の責任を負いかねまのでご了承の上、お使いいただきますようお願い申しあげます。
            | ※ ログインすることでこのご注意に同意したものとみなされます。
      .columns
        .column.col-12
          .in-column
            h3 一週間単位でチームのタスクを共有できるWebアプリ
            p Sprintusはチーム内でタスクを共有するシステムです。
              | タスクの時間軸を一週間に限定することで、従来のチャートとは違い
              | 長期的目標とは別にまず集中してタスクをこなすことにフォーカスします。
      .columns
        .column.col-12.column-heading
          h3.heading-l コンセプト
        .column.col-6
          .in-column
            .icon-image.is-l-size
              .i.fas.fa-eye
            h4 チーム内でタスクを見える化する
            p
            | 同じチームにいる誰が今週はどういうスケジュールでタスクを行なうか。それを確認しつつ自分はどういったタスクを行なうかを共有します。
            | チーム内で常に誰が何の作業をしているか、するのかを正確に共有できてこそ一体感や共闘感が生まれ、チームは健全に回ります。
        .column.col-6
          .in-column
            .icon-image.is-l-size
              .i.fas.fa-calendar-week
            h4 今週だけにフォーカスする
            p
            | 正確でない予想スケジュールは信頼性が弱く、やがて使われてないのも同然になってしまいます。
            | Sprintusはあえて一週間に限定することで、「今週やること」を週始めにスケジューリングしコミットするためのシステムにしました。
      .columns
        .column.col-12.column-heading
          h3.heading-l 概念
      .columns.columns-line
        .column.col-6
          .in-column
            .icon-image.is-m-size
              .i.fas.fa-sitemap
            h4 Organization（組織）
            p
            | 全ての機能はOrganizationという組織ごとの単位で管理されます。
            | 基本的にOrganizationの中で所属メンバー、チーム、タスク、独り言を扱います。
            | 別のOrganization内では同じユーザーであっても、全く別の役割やポジションとして扱うことができます。
            | 当然別のOrganizationの情報は一切共有することはできません。
        .column.col-6
          .in-column
            .icon-image.is-m-size
              .i.fas.fa-users
            h4 Team（チーム）
            p
            | Organization(組織)内での複数人の集まりです。所属してない他チームのデータは見えません。
            | Organizationに属するメンバーが多くなってもチームごとに分割することによって不必要な情報を共有しなくしたり、チーム外のメンバーとの不必要な情報共有を防ぐことができます。
      .columns.columns-line
        .column.col-6
          .in-column
            .icon-image.is-m-size
              .i.fas.fa-tasks
            h4 Task（タスク）
            p
            | 曜日を指定してタスクを登録します。登録の際に公開範囲を選択することで、公開範囲のメンバーだけに共有できます。
            | 週の開始日に完了済みは一掃され、未完了は強制的に週の始めの日に割り当てられます。
            | Sprintusにおけるメインの機能です。
        .column.col-6
          .in-column
            .icon-image.is-m-size
              .i.fas.fa-comment
            h4 Monologue（独り言）
            p
            | 何かを始める時、終わった時の分報的な役割だったり、問題に直面し詰まった時など発言することによって「困っている」というアラートをやんわりと挙げます。
            | 反応がされない前提としているため、あえてリプライ機能はありません。
            | タスクと同様に公開範囲を選択できます。
        .column.col-6
      .columns
        .column.col-12.column-heading
          h3.heading-l 使い方
          figure.figure
            img.img-responsive.usage-img(src="~/assets/images/usage.png" alt="usage")
            figcaption.figure-caption.text-center 使い方
        .column.col-12.column-heading
          h4.heading-m ヘッダー: 設定の変更/表示範囲の変更
        .column.col-3
          .in-column
            h5 (1): タイトルロゴ
            p トップページに戻ります
        .column.col-3
          .in-column
            h5 (2): Organization
            p Organizationの作成、変更、設定変更など（一部未対応）
        .column.col-3
          .in-column
            h5 (3): Team
            p チームの作成、参加、変更、設定変更など
        .column.col-3
          .in-column
            h5 (4): 自身のアイコン
            p 現在のOrganization内での表示名と名前の変更。またはログアウト
        .column.col-12.column-heading
          h4.heading-m メイン: 独り言、タスクの追加
        .column.col-6
          .in-column
            h5 (5): 独り言タイムライン
            p 表示範囲内のメンバーの独り言を表示。ゴミ箱アイコンを押すと削除。
        .column.col-6
          .in-column
            h5 (6): メンバーのタスク
            p 曜日ごとのタスク表示。チェックボックスのクリックで完了。タスク名のクリックで編集や削除。
        .column.col-12.column-heading
            h4.heading-m フッター: 設定の変更/表示範囲の変更
        .column.col-3
          .in-column
            h5 (7): 追加内容の選択
            p 追加する独り言(monologue)、タスク(task）を選択
        .column.col-3
          .in-column
            h5 (8): 公開範囲の選択
            p その公開範囲を組織全体(organization)か現在表示中のチームか選択
        .column.col-3
          .in-column
            h5 (9): タイトルの編集
            p 独り言の内容またはタスクのタイトルの編集
        .column.col-3
          .in-column
            h5 (10): 投稿
            p 投稿ボタン。タスクの場合は別途タスクの曜日設定などを表示。
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State, Getter, Action } from 'vuex-class'
import { db } from '~/plugins/firebase'
@Component({
  components: {},
})
export default class extends Vue {
  moveToLogin(): void {
    this.$router.push('/login')
  }
}
</script>

<style scoped lang="sass">
.full-width-hero
  width: 100vw
  padding: 0 2em
  background-color: $pure-black
  color: $pure-white
.hero_title
  font-size: 2rem
.logo_img
  height: 5rem
.fonetics
  font-size: 1rem
  color: $beluga
  padding-left: 0.5rem
.hero_description
  font-size: 1.6rem
.hero_btn
  width: 30%
  font-width: bold
.columns-first
  padding-bottom: 1rem
.in-column
  background-color: $white
  border-radius: 0.2rem
  padding: 1em
  height: 100%
  white-space: pre-wrap
.caution
  background-color: $secondary-color
.container-padding
  padding: 1rem 2rem 0
.column-heading
  padding: 2rem 0.5rem 1rem
  color: $pure-white
.heading-l
  padding-left: 1rem
  text-align: center
.heading-m
  border-left: 5px solid $beluga
  padding-left: 1rem
.columns-line
  &:not(:last-of-type)
    padding-bottom: 0.4rem
  &:not(:first-of-type)
    padding-top: 0.4rem
h1,h2,h3,h4,h5,h6
  font-weight: bold
.usage-image
  margin: auto
.icon-image
  display: block
  text-align: center
  &.is-m-size
    font-size: 3rem
  &.is-l-size
    font-size: 5rem
</style>

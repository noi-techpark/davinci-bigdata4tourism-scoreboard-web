// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export default function({ $axios, app }) {
  $axios.onError((error) => Promise.reject(error))
}
